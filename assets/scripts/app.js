import modular from "modujs";
import * as modules from "./modules";
import globals from "./globals";
import { html } from "./utils/environment";

const app = new modular({
  modules: modules,
});

window.addEventListener("load", () => {
  init();
});

function init() {
  html.classList.remove("no-js");

  globals();

  // remove all console log
  console.log = function () {};

  app.init(app);
}
