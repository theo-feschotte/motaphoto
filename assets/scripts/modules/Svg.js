// import { module as BaseModule } from "modujs";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// export default class extends BaseModule {
//     constructor(m) {
//         super(m);

//         this.svg = this.el.querySelectorAll("path");
//     }
    
//     init() {
//         console.log("Svg init");
        
//         const tl = gsap.timeline({
//             paused: true,
//             scrollTrigger: {
//                 trigger: this.el,
//                 start: this.getData("start") || "top bottom",
//                 end: this.getData("end") || "bottom top",
//                 scrub: this.getData("autoplay") === "true" ? false : true,
//                 toggleActions: "play none none none",
//                 // markers: true,
//             },
//         });
        
//         tl.fromTo(this.svg,
//             {
//                 drawSVG: "0% live",
//             },
//             {
//                 drawSVG: "100% live",
//                 duration: 1.5,
//                 stagger: 0.5,
//             }
//         );
//     }
// }
