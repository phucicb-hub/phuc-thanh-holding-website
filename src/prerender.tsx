import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CompanyVerification from './pages/verification/page';
import AiProduct from './pages/ai-product/page';
import Home from './pages/home/page';
import Technology from './pages/technology/page';
import Overview from './pages/overview/page';
import { company } from './lib/company';

export async function renderPublicPage(path: string) {
  const lang = path.startsWith('/en') ? 'en' : 'vi';
  await i18n.changeLanguage(lang);
  const verification = path.includes('verification') || path.includes('xac-minh');
  const home = path === '/en' || path === '/vi';
  const technology = path.includes('technology') || path.includes('cong-nghe');
  const about = path.includes('/about') || path.includes('/tong-quan');
  const Page = home ? Home : verification ? CompanyVerification : technology ? Technology : about ? Overview : AiProduct;
  const title = home ? company.nameEn : verification ? 'Company Verification | Phuc Thanh Holding' : technology ? 'Technology & Planned Claude Integration | Phuc Thanh Holding' : about ? 'Company Overview | Phuc Thanh Holding' : 'AI Products & Development | Phuc Thanh Holding';
  const description = technology ? 'Planned shop assistant architecture. In Development; Claude API has not yet been integrated.' : about ? 'Company identity, software publishing and technology development at Phuc Thanh Holding.' : verification
    ? 'Phuc Thanh Holding was registered on 4 April 2024. Registration number 2500716846. Legal identity and public registration reference.'
    : home ? 'Phuc Thanh Holding, registered in Vietnam on 4 April 2024, develops software and technology projects. Official company identity and project information.'
    : 'An online shop at shop.phucthanhholding.com is under development. Claude API integration is planned and has not been implemented.';
  const html = renderToString(<I18nextProvider i18n={i18n}><StaticRouter location={path}><Page /></StaticRouter></I18nextProvider>);
  return { html, title, description, lang, company };
}
