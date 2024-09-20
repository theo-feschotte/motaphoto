// import { module as BaseModule } from "modujs";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";
// gsap.registerPlugin(SplitText);

// export default class extends BaseModule {
//   constructor(m) {
//     super(m);
//   }

//   init() {
//     console.log("SplitTexts init");

//     this.splitByLines = new SplitText(
//       this.el.querySelectorAll("[data-split='lines']"),
//       {
//         type: "lines",
//         linesClass: "line",
//       }
//     );

//     this.splitByWords = new SplitText(
//       this.el.querySelectorAll("[data-split='words']"),
//       {
//         type: "lines,words",
//         wordsClass: "word",
//         linesClass: "line",
//       }
//     );

//     this.splitByChars = new SplitText(
//       this.el.querySelectorAll("[data-split='chars']"),
//       {
//         type: "words,chars",
//         // linesClass: "line",
//         wordsClass: "word",
//         charsClass: "char",
//       }
//     );

//     // reset on resize
//     window.addEventListener("resize", () => {
//       console.log("resize");
//       this.splitByLines.revert();
//       this.splitByWords.revert();
//       this.splitByChars.revert();
//     });

//     // Lines
//     this.splitByLines.elements.forEach((item) => {
//       const lines = item.querySelectorAll(".line");

//       // stagger
//       let delay = 0;
//       lines.forEach((line, j) => {
//         line.style.transitionDelay = `${j * 0.1 + delay}s`;
//       });
//     });

//     // Words
//     this.splitByWords.elements.forEach((item) => {
//       const lines = item.querySelectorAll(".line");

//       // stagger
//       let delay = 0;
//       lines.forEach((line, j) => {
//         line.style.transitionDelay = `${j * 0.1 + delay}s`;
//         line.querySelectorAll(".word").forEach((word, k) => {
//           word.style.transitionDelay = `${k * 0.05 + delay}s`;
//         });
//       });
//     });

//     // Chars
//     this.splitByChars.elements.forEach((item) => {
//       const chars = item.querySelectorAll(".char");

//       // stagger
//       let delay = 0;
//       chars.forEach((char, j) => {
//         char.style.transitionDelay = `${j * 0.02 + delay}s`;
//       });
//     });
//   }
// }
