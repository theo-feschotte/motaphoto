import { module as BaseModule } from "modujs";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default class extends BaseModule {
  constructor(m) {
    super(m);

    this.events = {
      click: {
        open: "open",
        close: "close",
      },
    };

    this.delay = '200';
  }

  init() {
    console.log("Lightbox init");

    const customDuration = Array.from(this.$("lightbox")[0].classList).some(className => className.includes('duration-['));
    const tailwindDuration = Array.from(this.$("lightbox")[0].classList).some(className => className.includes('duration-'));
    if (customDuration) {
        this.delay = Array.from(this.$("lightbox")[0].classList).find(className => className.includes('duration-[')).split('duration-[')[1].split('s]')[0];
        this.delay = this.delay * 1000;
    }
    if (!customDuration && tailwindDuration) {
        this.delay = Array.from(this.$("lightbox")[0].classList).find(className => className.includes('duration-')).split('duration-')[1];
    }

    this.swiper = new Swiper(this.$("slider")[0], {
      modules: [Navigation],
      navigation: {
        prevEl: this.$("prev")[0],
        nextEl: this.$("next")[0],
      },
    });
  }

  open(e) {
    const target = e.currentTarget;
    const item = this.parent('portfolioItem', target);
    const container = this.parent('portfolio', item);
    const index = Array.from(container.childNodes).indexOf(item);
    this.swiper.slideTo(index);
    this.$("lightbox")[0].classList.remove("hidden");
    setTimeout(() => {
      this.$("lightbox")[0].classList.remove("opacity-0", "user-none", "pointer-events-none");
    }, 0);
  }

  close() {
    this.$("lightbox")[0].classList.add("opacity-0", "user-none", "pointer-events-none");
    setTimeout(() => {
      this.$("lightbox")[0].classList.add("hidden");
    }, this.delay);
  }
}
