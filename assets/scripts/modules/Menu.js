import { module as BaseModule } from "modujs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// import { SplitText } from "gsap/SplitText";
// gsap.registerPlugin(SplitText);

export default class extends BaseModule {
  constructor(m) {
    super(m);

    this.events = {
      click: {
        button: "toggle",
      },
    };

    this.menuOpen = false;
  }

  init() {
    console.log("Menu init");
  }

  toggle() {
    const button = this.$("button")[0];
    if (this.menuOpen) {
      this.close();
      button.querySelector(".menu-open").classList.remove("hidden");
      button.querySelector(".menu-close").classList.add("hidden");
    } else {
      this.open();
      button.querySelector(".menu-open").classList.add("hidden");
      button.querySelector(".menu-close").classList.remove("hidden");
    }
  }

  open() {
    this.menuOpen = true;
    const menuHeight = this.$("menu")[0].offsetHeight;
    const itemHeight = this.$("link")[0].offsetHeight;
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "expo",
      },
      onStart: () => {
        this.$("menu")[0].style.pointerEvents = "auto";
        this.$("menu")[0].style.opacity = 1;
      },
    });
    tl.fromTo(
      this.$("menu")[0],
      {
        y: menuHeight * -1,
      },
      {
        y: 0,
      }
    );
    tl.fromTo(
      this.$("container")[0],
      {
        y: menuHeight,
      },
      {
        y: 0,
      },
      0
    );
    tl.fromTo(
      this.$("link"),
      {
        y: itemHeight,
      },
      {
        y: 0,
        stagger: 0.1,
      },
      0
    );
  }

  close() {
    this.menuOpen = false;
    const menuHeight = this.$("menu")[0].offsetHeight;
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "expo",
      },
      onComplete: () => {
        // this.$("menu")[0].style.pointerEvents = "none";
        // this.$("menu")[0].style.opacity = 0;
      },
    });
    tl.to(this.$("menu")[0], {
      y: menuHeight * -1,
    });
    tl.to(
      this.$("container")[0],
      {
        y: menuHeight,
      },
      0
    );
  }
}
