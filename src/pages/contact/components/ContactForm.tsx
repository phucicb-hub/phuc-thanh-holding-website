import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cooperationFields } from '@/mocks/contact';
import useLang from '@/hooks/useLang';
import { apiRequest } from '@/lib/api';

interface ContactFormProps {
  selectedField?: string;
}

export default function ContactForm({ selectedField = '' }: ContactFormProps) {
  const { t } = useTranslation();
  const lang = useLang();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [field, setField] = useState('');

  const fieldOptions = cooperationFields[lang].map((f) => f.title);

  useEffect(() => {
    if (selectedField) {
      setField(selectedField);
    }
  }, [selectedField]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = ((formData.get('company_alt') as string) || '').trim();
    if (honeypot) {
      setStatus('success');
      setFormError('');
      form.reset();
      setField('');
      return;
    }
    formData.delete('company_alt');

    const payload: Record<string, string | boolean> = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        payload[key] = value;
      }
    });

    try {
      payload.consent = formData.get('consent') === 'on';
      const result = await apiRequest<{ ok: boolean }>('/contact', payload);
      if (result.ok) {
        setStatus('success');
        setFormError('');
        form.reset();
        setField('');
      } else {
        setStatus('error');
        setFormError(
          t('form.errorGeneric')
        );
      }
    } catch {
      setStatus('error');
      setFormError(t('form.errorNetwork'));
    }
  };

  return (
    <form
      id="contact-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="bg-background-50 border border-background-200/70 rounded-lg p-6 md:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground-800 mb-1.5">
            {t('form.fullName')} <span className="text-accent-600">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            placeholder={t('form.fullNamePlaceholder')}
            className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground-800 mb-1.5">
            {t('form.email')} <span className="text-accent-600">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder={t('form.emailPlaceholder')}
            className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground-800 mb-1.5">
            {t('form.phone')}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={30}
            placeholder={t('form.phonePlaceholder')}
            className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-org" className="block text-sm font-medium text-foreground-800 mb-1.5">
            {t('form.organization')}
          </label>
          <input
            id="contact-org"
            name="organization"
            type="text"
            maxLength={160}
            placeholder={t('form.organizationPlaceholder')}
            className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          />
        </div>
      </div>

      <label className="mb-5 flex items-start gap-2 text-sm text-foreground-700">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>Tôi đồng ý để Phúc Thành Holding xử lý thông tin này nhằm phản hồi yêu cầu liên hệ.</span>
      </label>

      <div className="mb-4">
        <label htmlFor="contact-field" className="block text-sm font-medium text-foreground-800 mb-1.5">
          {t('form.field')}
        </label>
        <select
          id="contact-field"
          name="field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">{t('form.fieldPlaceholder')}</option>
          {fieldOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground-800 mb-1.5">
          {t('form.message')} <span className="text-accent-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={500}
          rows={5}
          placeholder={t('form.messagePlaceholder')}
          className="w-full px-4 py-2.5 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none"
        />
      </div>

      <input
        type="text"
        name="company_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
        className="form-honeypot"
      />

      <input
        type="hidden"
        name="submitted_language"
        value={lang === 'en' ? 'English' : 'Vietnamese'}
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
      >
        {t('form.submit')}
        <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center" />
      </button>

      {status === 'success' && (
        <div className="mt-4 p-4 rounded-md bg-primary-50 text-primary-800 text-sm flex items-start gap-2">
          <i className="ri-checkbox-circle-line w-5 h-5 flex items-center justify-center shrink-0" />
          {t('form.success')}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 p-4 rounded-md bg-accent-50 text-accent-900 text-sm flex items-start gap-2">
          <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center shrink-0" />
          {formError}
        </div>
      )}
    </form>
  );
}
