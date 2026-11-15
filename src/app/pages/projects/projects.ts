import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import { GithubLiveStats } from '../../core/github-live';
import { HoverPreview } from '../../core/hover-preview';
import { LANGUAGES, LANGUAGE_COLORS, PROJECTS, Project, previewUrl, repoUrl } from '../../data/projects';

/**
 * Order of the big "Ausgewählte Projekte" cards. Only projects with `featured` data in
 * projects.ts may appear here; the order is by strength, not by date.
 */
const FEATURED_ORDER = [
  'anime-kalender-de',
  'chrome-utilities',
  'obs-disk-replay-buffer',
  'stardust-to-singularity',
  'incremental-adventure',
  'malazan-cyoa',
];

@Component({
  selector: 'app-projects',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  // The floating preview is anchored to fixed coordinates captured at mouseenter;
  // scrolling would let it drift away from its card, so close it instead.
  host: { '(window:scroll)': 'hidePreview()' },
})
export class Projects {
  protected readonly i18n = inject(I18n);
  protected readonly repoUrl = repoUrl;
  protected readonly previewUrl = previewUrl;

  private readonly live = inject(GithubLiveStats);
  protected readonly liveLoading = this.live.loading;

  constructor() {
    this.live.ensure(PROJECTS.map((p) => p.name));
  }

  protected readonly featured = FEATURED_ORDER.map((n) => PROJECTS.find((p) => p.name === n)).filter(
    (p): p is Project & { featured: NonNullable<Project['featured']> } => !!p?.featured,
  );

  private readonly rest = PROJECTS.filter((p) => !FEATURED_ORDER.includes(p.name));

  /** Compact sections below the featured block; unfinished work goes behind a <details>. */
  protected readonly sections = [
    { id: 'serious', icon: '💼', titleKey: 'projects.serious', items: this.rest.filter((p) => p.category === 'serious') },
    { id: 'guides', icon: '📘', titleKey: 'projects.guides', items: this.rest.filter((p) => p.category === 'guides') },
    { id: 'fun', icon: '🎮', titleKey: 'projects.fun', items: this.rest.filter((p) => p.category === 'fun') },
  ];
  protected readonly abandoned = this.rest.filter((p) => p.category === 'abandoned');

  // ===== Live-or-fallback field access =====
  // Commits/dates/language come live from GitHub when available (see GithubLiveStats),
  // falling back to the curated snapshot in data/projects.ts otherwise.
  protected commitsOf(p: Project): number {
    return this.live.stats()[p.name]?.commits ?? p.commits;
  }

  protected startedOf(p: Project): string {
    return this.live.stats()[p.name]?.started ?? p.started;
  }

  protected lastTouchedOf(p: Project): string {
    return this.live.stats()[p.name]?.lastTouched ?? p.lastTouched;
  }

  protected langOf(p: Project): string {
    return this.live.stats()[p.name]?.language ?? LANGUAGES[p.name] ?? '';
  }

  protected langColor(p: Project): string {
    return LANGUAGE_COLORS[this.langOf(p)] ?? 'var(--text-2)';
  }

  protected hasRepoLink(p: Project): boolean {
    return !p.repoPrivate || !!p.publicRepo;
  }

  // ===== Summary strip =====
  protected readonly projectCount = PROJECTS.length;
  protected readonly totalCommits = computed(() => PROJECTS.reduce((sum, p) => sum + this.commitsOf(p), 0));
  protected readonly totalHours = PROJECTS.reduce((sum, p) => sum + p.estHours, 0);
  protected readonly yearsActive = computed(
    () => new Date().getFullYear() - Math.min(...PROJECTS.map((p) => +this.startedOf(p).slice(0, 4))),
  );

  /** Fresh = touched within the last 6 months; drives the small green dot. */
  protected isFresh(p: Project): boolean {
    const lastTouched = this.lastTouchedOf(p);
    const now = new Date();
    const months = (now.getFullYear() - +lastTouched.slice(0, 4)) * 12 + (now.getMonth() + 1 - +lastTouched.slice(5, 7));
    return months < 6;
  }

  // ===== Rich hover preview (shared with the arcade page, see HoverPreview) =====
  private readonly preview = new HoverPreview<Project>();
  protected readonly hoveredPreview = this.preview.item;
  protected readonly previewPos = this.preview.pos;

  protected showPreview(p: Project, ev: MouseEvent): void {
    if (p.preview) {
      this.preview.show(p, ev);
    }
  }

  protected hidePreview(): void {
    this.preview.hide();
  }

  /** "2022-09" → "09/2022" */
  protected month(ym: string): string {
    const [y, m] = ym.split('-');
    return `${m}/${y}`;
  }

  protected span(p: Project): string {
    const from = this.month(this.startedOf(p));
    const to = this.month(this.lastTouchedOf(p));
    return from === to ? from : `${from} – ${to}`;
  }

  protected formatNumber(n: number): string {
    return n.toLocaleString(this.i18n.lang() === 'de' ? 'de-DE' : 'en-US');
  }
}
