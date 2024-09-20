import gsap from "gsap";

const DURATION = 0.25;
let timeline;

export default {
  name: "default",
  leave(data) {
    // return gsap.to(data.current.container, {
    //   opacity: 0,
    //   duration: DURATION,
    // });
  },
  enter(data) {
    // return gsap.from(data.next.container, {
    //   opacity: 0,
    //   duration: DURATION,
    // });
  },
};
