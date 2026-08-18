import { useEffect } from 'react';

export interface FaqPageItem {
  question: string;
  answer: string;
}

interface FaqPageSeoProps {
  items: FaqPageItem[];
  scriptId: string;
}

export default function FaqPageSeo({ items, scriptId }: FaqPageSeoProps) {
  useEffect(() => {
    const existing = document.getElementById(scriptId);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    let script = existing as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [items, scriptId]);

  return null;
}