import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import { GithubLiveStats } from '../../core/github-live';
import { LANGUAGES, LANGUAGE_COLORS, PROJECTS, Project, repoUrl } from '../../data/projects';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly i18n = inject(I18n);
  protected readonly repoUrl = repoUrl;

  private readonly live = inject(GithubLiveStats);
  protected readonly liveLoading = this.live.loading;

  constructor() {
    this.live.ensure(PROJECTS.map((p) => p.name));
  }

  protected readonly sections = [
    { id: 'serious', icon: '💼', titleKey: 'projects.serious', hintKey: '', items: PROJECTS.filter((p) => p.category === 'serious') },
    { id: 'fun', icon: '🎮', titleKey: 'projects.fun', hintKey: '', items: PROJECTS.filter((p) => p.category === 'fun') },
    { id: 'abandoned', icon: '🚧', titleKey: 'projects.abandoned', hintKey: 'projects.abandoned.hint', items: PROJECTS.filter((p) => p.category === 'abandoned') },
  ];

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

  // ===== Summary strip =====
  protected readonly projectCount = PROJECTS.length;
  protected readonly totalCommits = computed(() => PROJECTS.reduce((sum, p) => sum + this.commitsOf(p), 0));
  protected readonly totalHours = PROJECTS.reduce((sum, p) => sum + p.estHours, 0);

  // ===== Shared timeline axis: all cards use the same year scale =====
  private readonly yearFraction = (ym: string): number => {
    const [y, m] = ym.split('-').map(Number);
    return y + (m - 1) / 12;
  };

  protected readonly tlMin = computed(() =>
    Math.floor(Math.min(...PROJECTS.map((p) => this.yearFraction(this.startedOf(p))))),
  );
  protected readonly tlMax = computed(
    () => Math.ceil(Math.max(...PROJECTS.map((p) => this.yearFraction(this.lastTouchedOf(p))))) + 0.5,
  );
  protected readonly gridYears = computed(() => {
    const min = this.tlMin();
    const max = this.tlMax();
    return Array.from({ length: Math.floor(max) - min - 1 }, (_, i) => min + i + 1);
  });
  protected readonly yearsActive = computed(() => Math.floor(this.tlMax()) - this.tlMin());

  private readonly maxCommits = computed(() => Math.max(...PROJECTS.map((p) => this.commitsOf(p))));
  private readonly maxHours = Math.max(...PROJECTS.map((p) => p.estHours));

  protected tickLeft(year: number): number {
    return ((year - this.tlMin()) / (this.tlMax() - this.tlMin())) * 100;
  }

  protected tlLeft(p: Project): number {
    return this.tickLeft(this.yearFraction(this.startedOf(p)));
  }

  protected tlWidth(p: Project): number {
    const min = this.tlMin();
    const max = this.tlMax();
    const raw = ((this.yearFraction(this.lastTouchedOf(p)) + 1 / 12 - this.yearFraction(this.startedOf(p))) / (max - min)) * 100;
    return Math.max(raw, 2.5);
  }

  /** Log scale so 246 commits don't flatten everything else. */
  protected commitPct(p: Project): number {
    return (Math.log(this.commitsOf(p) + 1) / Math.log(this.maxCommits() + 1)) * 100;
  }

  protected hoursPct(p: Project): number {
    return (Math.log(p.estHours + 1) / Math.log(this.maxHours + 1)) * 100;
  }

  /** Freshness of lastTouched relative to today: fresh <6 months, warm <18, else cold. */
  protected freshness(p: Project): 'fresh' | 'warm' | 'cold' {
    const lastTouched = this.lastTouchedOf(p);
    const now = new Date();
    const months = (now.getFullYear() - +lastTouched.slice(0, 4)) * 12 + (now.getMonth() + 1 - +lastTouched.slice(5, 7));
    return months < 6 ? 'fresh' : months < 18 ? 'warm' : 'cold';
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
}
