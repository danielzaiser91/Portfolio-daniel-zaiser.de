import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import { PROJECTS } from '../../data/projects';
import { GITHUB_URL, LINKEDIN_URL } from '../../app';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly i18n = inject(I18n);
  protected readonly linkedin = LINKEDIN_URL;
  protected readonly github = GITHUB_URL;

  /** Professional Angular experience, counted from July 2018. */
  protected readonly yearsOfAngular = Math.floor(
    (Date.now() - new Date(2018, 6, 1).getTime()) / (365.25 * 24 * 3600 * 1000),
  );
  protected readonly repoCount = PROJECTS.length;

  protected readonly techStack = [
    'Angular', 'TypeScript', 'RxJS', 'Signals', 'NgRx', 'SCSS/SASS',
    'Node.js', 'C# / .NET', 'Azure DevOps', 'Docker', 'REST APIs', 'PWA',
    'TDD/BDD', 'Git', 'Agile / Scrum',
  ];
}
