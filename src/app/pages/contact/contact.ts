import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18n } from '../../core/i18n';
import { LINKEDIN_URL } from '../../app';

/**
 * Web3Forms access key. This key is public by design: it only identifies the
 * form target server-side — the actual email address never appears anywhere
 * in this codebase. Spam is filtered by Web3Forms plus the honeypot below.
 * Get yours at https://web3forms.com (free).
 */
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly i18n = inject(I18n);
  protected readonly linkedin = LINKEDIN_URL;

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
    /** Honeypot — humans never see or fill this field. */
    botcheck: [''],
  });

  protected readonly state = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');
    try {
      const value = this.form.getRawValue();
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: 'daniel-zaiser.de Portfolio',
          name: value.name,
          email: value.email,
          subject: value.subject || `Portfolio contact from ${value.name}`,
          message: value.message,
          botcheck: value.botcheck,
        }),
      });
      const data = await res.json();
      if (data.success) {
        this.state.set('success');
        this.form.reset();
      } else {
        this.state.set('error');
      }
    } catch {
      this.state.set('error');
    }
  }

  protected invalid(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && c.touched;
  }
}
