import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { LANGUAGES, LANGUAGE_COLORS, PROJECTS, Project, repoUrl } from '../../data/projects';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly i18n = inject(I18n);
  protected readonly repoUrl = repoUrl;

  protected readonly sections = [
    { id: 'serious', icon: '💼', titleKey: 'projects.serious', hintKey: '', items: PROJECTS.filter((p) => p.category === 'serious') },
    { id: 'fun', icon: '🎮', titleKey: 'projects.fun', hintKey: '', items: PROJECTS.filter((p) => p.category === 'fun') },
    { id: 'abandoned', icon: '🚧', titleKey: 'projects.abandoned', hintKey: 'projects.abandoned.hint', items: PROJECTS.filter((p) => p.category === 'abandoned') },
  ];

  // ===== Summary strip =====
  protected readonly projectCount = PROJECTS.length;
  protected readonly totalCommits = PROJECTS.reduce((sum, p) => sum + p.commits, 0);
  protected readonly totalHours = PROJECTS.reduce((sum, p) => sum + p.estHours, 0);

  // ===== Shared timeline axis: all cards use the same year scale =====
  private readonly yearFraction = (ym: string): number => {
    const [y, m] = ym.split('-').map(Number);
    return y + (m - 1) / 12;
  };

  protected readonly tlMin = Math.floor(Math.min(...PROJECTS.map((p) => this.yearFraction(p.started))));
  protected readonly tlMax = Math.ceil(Math.max(...PROJECTS.map((p) => this.yearFraction(p.lastTouched)))) + 0.5;
  protected readonly gridYears = Array.from(
    { length: Math.floor(this.tlMax) - this.tlMin - 1 },
    (_, i) => this.tlMin + i + 1,
  );
  protected readonly yearsActive = Math.floor(this.tlMax) - this.tlMin;

  private readonly maxCommits = Math.max(...PROJECTS.map((p) => p.commits));
  private readonly maxHours = Math.max(...PROJECTS.map((p) => p.estHours));

  protected tickLeft(year: number): number {
    return ((year - this.tlMin) / (this.tlMax - this.tlMin)) * 100;
  }

  protected tlLeft(p: Project): number {
    return this.tickLeft(this.yearFraction(p.started));
  }

  protected tlWidth(p: Project): number {
    const raw = ((this.yearFraction(p.lastTouched) + 1 / 12 - this.yearFraction(p.started)) / (this.tlMax - this.tlMin)) * 100;
    return Math.max(raw, 2.5);
  }

  /** Log scale so 246 commits don't flatten everything else. */
  protected commitPct(p: Project): number {
    return (Math.log(p.commits + 1) / Math.log(this.maxCommits + 1)) * 100;
  }

  protected hoursPct(p: Project): number {
    return (Math.log(p.estHours + 1) / Math.log(this.maxHours + 1)) * 100;
  }

  /** Freshness of lastTouched relative to today: fresh <6 months, warm <18, else cold. */
  protected freshness(p: Project): 'fresh' | 'warm' | 'cold' {
    const now = new Date();
    const months = (now.getFullYear() - +p.lastTouched.slice(0, 4)) * 12 + (now.getMonth() + 1 - +p.lastTouched.slice(5, 7));
    return months < 6 ? 'fresh' : months < 18 ? 'warm' : 'cold';
  }

  protected langOf(p: Project): string {
    return LANGUAGES[p.name] ?? '';
  }

  protected langColor(p: Project): string {
    return LANGUAGE_COLORS[this.langOf(p)] ?? 'var(--text-2)';
  }

  /** "2022-09" → "09/2022" */
  protected month(ym: string): string {
    const [y, m] = ym.split('-');
    return `${m}/${y}`;
  }

  protected span(p: Project): string {
    const from = this.month(p.started);
    const to = this.month(p.lastTouched);
    return from === to ? from : `${from} – ${to}`;
  }
}
