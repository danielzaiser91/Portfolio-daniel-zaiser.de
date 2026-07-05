import { q, qAll,getPopover } from "./index.js"


export function init_ui_listeners() {
  q('#popover .close').addEventListener('click', () => {
    getPopover().classList.add('hide');
  });
}
