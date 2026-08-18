import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FaqSection from '@/components/feature/FaqSection';

import CooperationHero from './components/CooperationHero';
import InvitationSection from './components/InvitationSection';
import CooperationFields from './components/CooperationFields';
import ProcessSection from './components/ProcessSection';
import PrinciplesSection from './components/PrinciplesSection';
import ProposalFormSection from './components/ProposalFormSection';

export default function Contact() {
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState('');

  const contactFaq = [
    { question: t('contact.faq1.q'), answer: t('contact.faq1.a') },
    { question: t('contact.faq2.q'), answer: t('contact.faq2.a') },
    { question: t('contact.faq3.q'), answer: t('contact.faq3.a') },
    { question: t('contact.faq4.q'), answer: t('contact.faq4.a') },
    { question: t('contact.faq5.q'), answer: t('contact.faq5.a') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CooperationHero />
        <InvitationSection />
        <CooperationFields onSelectField={setSelectedField} />
        <ProcessSection />
        <PrinciplesSection />
        <ProposalFormSection selectedField={selectedField} />
        <FaqSection
          items={contactFaq}
          scriptId="faq-contact-jsonld"
          title={t('contact.faqTitle')}
          description={t('contact.faqDesc')}
        />
      </main>
      <Footer />
    </div>
  );
}