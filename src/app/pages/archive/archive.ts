import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n';

@Component({
  selector: 'app-archive',
  imports: [],
  templateUrl: './archive.html',
  styleUrl: './archive.scss',
})
export class Archive {
  protected readonly i18n = inject(I18n);
}
