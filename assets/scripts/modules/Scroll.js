import { module as BaseModule } from "modujs";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// gsap.registerPlugin(ScrollSmoother);

export default class extends BaseModule {
  constructor(m) {
    super(m);
  }

  init() {
    console.log("Scroll init");

    const scroll = new Lenis();

    scroll.on("scroll", ScrollTrigger.update);

    window.addEventListener("resize", () => {
      scroll.resize();
    });

    gsap.ticker.add((time) => {
      scroll.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.lenis = scroll;

    // ScrollSmoother.create({
    //   smooth: 0,
    //   effects: true,
    // });
  }
}
