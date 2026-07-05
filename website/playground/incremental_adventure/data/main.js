import { hello_world, init_ui_listeners } from "./js/index.js";

console.log(hello_world);

document.addEventListener('DOMContentLoaded', () => {
  init_ui_listeners();
});
