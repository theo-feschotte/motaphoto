// import { module as BaseModule } from "modujs";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// gsap.registerPlugin(ScrollTrigger, SplitText);

// export default class extends BaseModule {
//   constructor(m) {
//     super(m);

//     this.splitedChars = [];
//     this.splitedWords = [];
//     this.splitedLines = [];
//   }

//   init() {
//     console.log("Text init");

//     this.tl = gsap.timeline({
//       paused: true,
//       defaults: {
//         ease: "expo.out",
//       },
//       scrollTrigger: {
//         trigger: this.el,
//         start: "top 100%",
//         end: "bottom 0%",
//       },
//     });

//     this.splitChars();
//     this.splitWords();
//     this.splitLines();
//   }

//   splitLines() {
//     // const elements = this.el.querySelectorAll("[data-split='lines']");
//     const elements = this.el.querySelectorAll("h4, h5, h6, p, ul, ol");

//     if (!elements) return;

//     elements.forEach((el) => {
//       //   el.style.opacity = 0;
//       const split = new SplitText(el, {
//         type: "lines",
//         linesClass: "line",
//       });

//       el.style.opacity = 1;

//       this.tl.from(
//         split.lines,
//         {
//           y: 0,
//           opacity: 0,
//           scaleY: 0,
//           transformOrigin: "bottom center",
//           stagger: 0.1,
//           duration: 1,
//           onComplete: () => {
//             split.revert();
//             el.style.opacity = 1;
//           },
//         },
//         0
//       );
//     });
//   }

//   splitWords() {
//     // const elements = this.el.querySelectorAll("[data-split='words']");
//     const elements = this.el.querySelectorAll("div > span");

//     if (!elements) return;

//     elements.forEach((el) => {
//       //   el.style.opacity = 0;
//       const split = new SplitText(el, {
//         type: "words",
//         wordsClass: "word",
//       });

//       el.style.opacity = 1;

//       this.tl.from(
//         split.words,
//         {
//           x: 10,
//           opacity: 0,
//           scaleY: 0,
//           transformOrigin: "bottom left",
//           duration: 1.4,
//           stagger: 0.1,
//           onComplete: () => {
//             split.revert();
//             el.style.opacity = 1;
//           },
//         },
//         0
//       );
//     });
//   }

//   splitChars() {
//     // const elements = this.el.querySelectorAll("[data-split='chars']");
//     const elements = this.el.querySelectorAll("h1, h2, h3, a.btn, button");

//     if (!elements) return;

//     elements.forEach((el) => {
//       //   el.style.opacity = 0;
//       const split = new SplitText(el, {
//         type: "words,chars",
//         charsClass: "char",
//       });

//       el.style.opacity = 1;

//       this.tl.from(
//         split.chars,
//         {
//           // x: 30,
//           opacity: 0,
//           scaleY: 0,
//           scaleX: 0.7,
//           transformOrigin: "bottom left",
//           duration: 1.4,
//           stagger: 0.008,
//           onComplete: () => {
//             split.revert();
//             el.style.opacity = 1;
//           },
//         },
//         0
//       );
//     });
//   }
// }
