import { Injectable, effect, signal } from '@angular/core';
import { TRANSLATIONS } from './translations';

export type Lang = 'de' | 'en';

/** Bilingual text — every piece of content exists in both languages. */
export interface LText {
  de: string;
  en: string;
}

const STORAGE_KEY = 'dz-lang';

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    });
  }

  /** Translate a dictionary key, e.g. `i18n.t('nav.projects')`. */
  t(key: string): string {
    return TRANSLATIONS[this.lang()][key] ?? key;
  }

  /** Resolve an inline bilingual text object. */
  pick(text: LText): string {
    return text[this.lang()];
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  private initialLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'de' || stored === 'en') {
      return stored;
    }
    return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
  }
}
