import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n, LText } from '../../core/i18n';
import { LINKEDIN_URL } from '../../app';

interface Station {
  role: LText;
  company: string;
  location: string;
  from: string;
  /** Empty string = current position. */
  to: string;
  about: LText;
  points: LText[];
}

@Component({
  selector: 'app-recruiters',
  imports: [RouterLink],
  templateUrl: './recruiters.html',
  styleUrl: './recruiters.scss',
})
export class Recruiters {
  protected readonly i18n = inject(I18n);
  protected readonly linkedin = LINKEDIN_URL;

  protected readonly skills = [
    'Angular (up to v21: Signals, new template syntax)', 'TypeScript / JavaScript', 'HTML', 'CSS / SCSS / SASS',
    'RxJS', 'NgRx Store', 'REST APIs', 'Node.js', 'Ruby on Rails', 'C# / .NET',
    'Azure DevOps', 'CI/CD', 'Hangfire', 'Docker', 'Git', 'TDD / BDD', 'PWA',
    'Chrome Extension development', 'Agile / Scrum', 'Jira',
  ];

  protected readonly stations: Station[] = [
    {
      role: { en: 'Senior Fullstack Developer', de: 'Senior Fullstack Developer' },
      company: 'Funk Gruppe GmbH',
      location: 'Hamburg',
      from: '08/2024',
      to: '',
      about: {
        en: 'Independent insurance broker and risk-management consultancy.',
        de: 'Unabhängiger Versicherungsmakler und Berater für Risikomanagement.',
      },
      points: [
        {
          en: 'Migration of a WPF legacy system into a modern Angular environment, including re-implementation of individual subsystems.',
          de: 'Migration des WPF-Altsystems in eine moderne Angular-Umgebung, inklusive Neuimplementation einzelner Teilsysteme.',
        },
        {
          en: 'Responsible for deployments and monitoring via Azure DevOps and Hangfire.',
          de: 'Verantwortlich für Deployments und Monitoring per Azure DevOps und Hangfire.',
        },
        {
          en: 'Angular knowledge extended to v21 (signals, new template syntax); picked up .NET and C# along the way.',
          de: 'Angular-Kenntnisse auf Stand v21 erweitert (Signals, neue Templatesyntax); dazu .NET und C# angeeignet.',
        },
      ],
    },
    {
      role: { en: 'Software Developer', de: 'Software Developer' },
      company: 'CGM (CompuGroup Medical) — CLICKDOC Pro',
      location: 'Koblenz',
      from: '07/2021',
      to: '07/2024',
      about: {
        en: 'Listed health-tech company building software for medical practices, pharmacies and hospitals.',
        de: 'Börsennotiertes Gesundheits-IT-Unternehmen: Software für Arztpraxen, Apotheken und Krankenhäuser.',
      },
      points: [
        {
          en: 'Core area: calendar & appointment search — maintenance and extension of the application.',
          de: 'Hauptaufgabenbereich: Kalender & Terminsuche — Wartung und Erweiterung der Applikation.',
        },
        {
          en: 'Frontend with Angular, TypeScript and Canvas; Angular/TypeScript knowledge raised to senior level.',
          de: 'Frontend mit Angular, Typescript und Canvas; Angular-/Typescript-Kenntnisse auf Senior-Level erhöht.',
        },
      ],
    },
    {
      role: { en: 'Web Developer', de: 'Web Entwickler' },
      company: 'Berge & Meer Touristik GmbH',
      location: 'Rengsdorf',
      from: '08/2018',
      to: '07/2021',
      about: {
        en: 'Tour operator in Rhineland-Palatinate; TUI subsidiary until 2019, sole operator behind Aldi travel.',
        de: 'Reiseveranstalter in Rheinland-Pfalz; Tochter der TUI bis 2019, alleiniger Veranstalter hinter Aldi-Reisen.',
      },
      points: [
        {
          en: 'Frameworks: Angular & Ruby on Rails; responsible for maintenance and development of the B&M website, partner sites and booking flow.',
          de: 'Frameworks: Angular & Ruby on Rails; zuständig für Wartung und Entwicklung der B&M-Webseite, Partnerseiten und Buchungsstrecke.',
        },
        {
          en: 'Project lead for the entry-requirements information service (API).',
          de: 'Projektleitung Einreiseinformationen (API).',
        },
        {
          en: 'Built an interactive world map showing all Berge & Meer products.',
          de: 'Entwicklung einer interaktiven Weltkarte mit Übersicht aller Produkte von Berge & Meer.',
        },
      ],
    },
  ];
}
