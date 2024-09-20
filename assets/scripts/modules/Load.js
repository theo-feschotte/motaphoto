import { module as BaseModule } from "modujs";
import barba from "@barba/core";
import defaultTransition from "../utils/transitions";
import { html } from "../utils/environment";

export default class extends BaseModule {
  constructor(m) {
    super(m);
  }

  init() {
    barba.init({
      timeout: 10000,
      schema: {
        prefix: "data-load",
      },
      transitions: [defaultTransition],
      prevent: ({ el, event, href }) => {
        if (window.confirmPageChange && event.type == "click") {
          this.call("close", null, "Nav");

          barba.prefetch(href);

          if (window.confirm(window.confirmPageChange.message)) {
            const barbaLoad = barba.go(href);
            if (!barbaLoad) window.location = href;
          }

          event.preventDefault();
          return true;
        } else {
          const forceReload = el.getAttribute("data-load") == "false" || false;

          if (window.location.href == href) {
            event.preventDefault();
            event.stopPropagation();

            return true;
          } else if (forceReload) {
            return true;
          } else {
            return false;
          }
        }
      },
    });

    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    barba.hooks.before(this.before.bind(this));
    barba.hooks.beforeLeave(this.beforeLeave.bind(this));
    barba.hooks.leave(this.leave.bind(this));
    barba.hooks.afterLeave(this.afterLeave.bind(this));
    barba.hooks.beforeEnter(this.beforeEnter.bind(this));
    barba.hooks.enter(this.enter.bind(this));
    barba.hooks.afterEnter(this.afterEnter.bind(this));
    barba.hooks.after(this.after.bind(this));
  }

  before(data, transition) {}

  beforeLeave() {}

  leave() {
    // this.call('reset', null, 'Hovers')
    // this.call('hideMenu', null, 'Header')
    window.scrollTo(0, 0);
    //add is-loading state
    html.classList.add("is-loading");
    html.classList.remove("is-loaded");
    html.classList.remove("is-ready");
  }

  afterLeave(data) {
    this.call("destroy", data.current.container, "app");
    data.current.container.remove();
  }

  beforeEnter({ next }) {
    const matches = next.html.match(/<body.+?class="([^""]*)"/i);
    document.body.setAttribute("class", (matches && matches.at(1)) ?? "");
  }

  enter(data) {
    // console.log('enter', data);
    // Retrieve HTML dataset on next container and update our real html element dataset accordingly
    const parser = new DOMParser();
    let nextDOM = parser.parseFromString(data.next.html, "text/html");
    let newDataset = Object.assign({}, nextDOM.querySelector("html").dataset);
    Object.entries(newDataset).forEach(([key, val]) => {
      html.setAttribute("data-" + toDash(key), val);
    });

    // Wait for a first render to properly start next page
    requestAnimationFrame(() => {
      html.classList.remove("is-loading");
      html.classList.add("is-loaded");
      this.call("update", data.next.container, "app");
    });
  }

  afterEnter() {
    // this.call("update", null, "Scroll");
  }

  after(data) {
    // console.log("after");
    html.classList.add("is-ready");
  }

  manualGo(el) {
    barba.go(el.href, el);
  }
}
