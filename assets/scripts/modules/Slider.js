import { module as BaseModule } from "modujs";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

export default class extends BaseModule {
  constructor(m) {
    super(m);

    this.swiper;
  }

  init() {
    console.log("Slider init");

    this.swiper = new Swiper(this.$("slider")[0], {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      direction: this.getData("direction") || "horizontal",
      loop: this.getData("loop") || false,
      autoplay: this.getData("autoplay")
        ? { delay: this.getData("autoplay") }
        : false,
      slidesPerView: this.getData("slidesperview") || 1,
      breakpoints: this.getData("slidesperview")
        ? {
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: this.getData("slidesperview") == 1 ? 1 : 2,
            },
            1024: {
              slidesPerView: this.getData("slidesperview"),
            },
          }
        : {},
      allowTouchMove: this.getData("touchmove") || false,
      speed: this.getData("effect") === "fade" ? 0 : 400,
      effect: this.getData("effect") || "slide",
      fadeEffect: this.getData("effect") === "fade" ? { crossFade: true } : {},
      spaceBetween: this.getData("slidesperview") ? 16 : 0,
      autoHeight: true,
      pagination: {
        el: this.$("pagination")[0],
      },
      navigation: {
        nextEl: this.$("next")[0],
        prevEl: this.$("prev")[0],
      },
    });
  }
}
