import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { PROJECTS, Project, repoUrl } from '../../data/projects';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly i18n = inject(I18n);
  protected readonly serious = PROJECTS.filter((p) => p.category === 'serious');
  protected readonly fun = PROJECTS.filter((p) => p.category === 'fun');
  protected readonly repoUrl = repoUrl;

  /** "2022-09" → "09/2022", localized display. */
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
