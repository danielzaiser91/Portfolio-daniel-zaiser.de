import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18n } from './core/i18n';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/daniel-zaiser-12960b206/';
export const GITHUB_URL = 'https://github.com/danielzaiser91';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly i18n = inject(I18n);
  protected readonly menuOpen = signal(false);
  protected readonly linkedin = LINKEDIN_URL;
  protected readonly github = GITHUB_URL;
  protected readonly year = new Date().getFullYear();

  protected readonly navLinks = [
    { path: '/', key: 'nav.home', exact: true },
    { path: '/projects', key: 'nav.projects', exact: false },
    { path: '/for-recruiters', key: 'nav.recruiters', exact: false },
    { path: '/archive', key: 'nav.archive', exact: false },
    { path: '/contact', key: 'nav.contact', exact: false },
  ];
}
