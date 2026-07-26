import { Component, computed, signal } from '@angular/core';
import { CATEGORY_LABELS, GAMES, Game, GameCategory, gamePreview } from '../../data/games';
import { HoverPreview } from '../../core/hover-preview';

interface Section {
  id: string;
  title: string;
  hint: string;
  items: Game[];
}

/**
 * Hidden page — intentionally not linked anywhere in the UI.
 * Shareable via direct URL (/arcade) with friends.
 * Content is German only (target audience: friends).
 */
@Component({
  selector: 'app-arcade',
  imports: [],
  templateUrl: './arcade.html',
  styleUrl: './arcade.scss',
  // The floating preview is anchored to coordinates captured at mouseenter; scrolling
  // would let it drift away from its card, so close it instead.
  host: { '(window:scroll)': 'hidePreview()' },
})
export class Arcade {
  protected readonly categoryLabels = CATEGORY_LABELS;
  protected readonly categories = Object.keys(CATEGORY_LABELS) as GameCategory[];

  protected readonly search = signal('');
  protected readonly activeCategory = signal<GameCategory | 'alle'>('alle');

  protected readonly featured = GAMES.filter((g) => g.featured);

  private readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const cat = this.activeCategory();
    return GAMES.filter((g) => {
      const matchesCat = cat === 'alle' || g.categories.includes(cat);
      if (!matchesCat) {
        return false;
      }
      if (!term) {
        return true;
      }
      const haystack = [g.title, g.description, g.situation, ...g.tags, ...g.categories.map((c) => CATEGORY_LABELS[c])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  });

  /** Games are the stars; minis/tools/WIP are deliberately separated — no false advertising. */
  protected readonly sections = computed<Section[]>(() => {
    const items = this.filtered();
    return [
      {
        id: 'games',
        title: '🎮 Spiele',
        hint: 'Fertig und spielbar — such dir was aus!',
        items: items.filter((g) => g.kind === 'game' && !g.wip),
      },
      {
        id: 'minis',
        title: '🧪 Mini-Projekte & Tech-Demos',
        hint: 'Keine Spiele — kleine Experimente, nett für zwischendurch.',
        items: items.filter((g) => g.kind === 'mini' && !g.wip),
      },
      {
        id: 'tools',
        title: '🛠️ Tools & Extensions',
        hint: 'Keine Spiele — Helfer für den Browser-Alltag.',
        items: items.filter((g) => g.kind === 'tool' && !g.wip),
      },
      {
        id: 'wip',
        title: '🚧 Unfertig & Prototypen',
        hint: 'Ehrliche Baustellen: angefangen, nicht vollendet. Auf eigene Gefahr.',
        items: items.filter((g) => !!g.wip),
      },
    ].filter((s) => s.items.length > 0);
  });

  protected readonly resultCount = computed(() => this.filtered().length);

  /** Distinct but consistent capsule gradient per game, derived from its title. */
  protected capsuleStyle(g: Game): string {
    let hash = 0;
    for (const char of g.title) {
      hash = (hash * 31 + char.charCodeAt(0)) % 360;
    }
    return `linear-gradient(135deg, hsl(${hash} 55% 28%), hsl(${(hash + 50) % 360} 65% 14%))`;
  }

  protected label(cat: GameCategory): string {
    return CATEGORY_LABELS[cat];
  }

  // ===== Rich hover preview: one floating panel at page level (desktop pointers only).
  // Same panel as on the projects page — the capsules are small and crop hard, so the
  // screenshot only becomes readable in a big floating view.
  private readonly preview = new HoverPreview<Game>();
  protected readonly hoveredGame = this.preview.item;
  protected readonly previewPos = this.preview.pos;
  protected readonly gamePreview = gamePreview;

  protected showPreview(g: Game, ev: MouseEvent): void {
    // Nothing to show for entries without any screenshot — an empty panel would only
    // cover the card the user is reading.
    if (gamePreview(g)) this.preview.show(g, ev);
  }

  protected hidePreview(): void {
    this.preview.hide();
  }

  protected buttonLabel(g: Game): string {
    if (g.repoOnly) {
      return '📦 Zum Repo';
    }
    return g.wip ? '🚧 Trotzdem ausprobieren' : '▶ Spielen';
  }
}
