import { signal } from '@angular/core';

/**
 * State for the floating hover-preview panel used by the projects and arcade pages.
 *
 * The panel is rendered once at page level, not inside the cards: the cards clip their
 * content (overflow: hidden) and are far too small to show a 800x420 screenshot
 * uncropped. Position is captured at mouseenter from the hovered card's rect, so the
 * page must close the panel on scroll — otherwise it drifts away from its card.
 *
 * Desktop pointers only: on touch there is no hover, and a panel that appears on tap
 * would just swallow the tap.
 */
export class HoverPreview<T> {
  /** Panel size, kept in sync with .rich-preview in styles.scss. */
  private static readonly W = 480;
  private static readonly H = 330;

  private readonly finePointer =
    typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

  readonly item = signal<T | null>(null);
  readonly pos = signal({ x: 0, y: 0 });

  show(item: T, ev: MouseEvent): void {
    if (!this.finePointer) {
      return;
    }
    const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    const { W, H } = { W: HoverPreview.W, H: HoverPreview.H };
    const gap = 14;
    const pad = 10;
    let x = r.right + gap;
    if (x + W > window.innerWidth - pad) {
      x = r.left - gap - W;
    }
    if (x < pad) {
      // No room on either side: center it near the card instead (pointer-events: none,
      // so overlapping the hovered card cannot cause hover flicker).
      x = Math.min(Math.max(pad, r.left + r.width / 2 - W / 2), window.innerWidth - W - pad);
    }
    const y = Math.max(pad, Math.min(r.top + r.height / 2 - H / 2, window.innerHeight - H - pad));
    this.pos.set({ x, y });
    this.item.set(item);
  }

  hide(): void {
    this.item.set(null);
  }
}
