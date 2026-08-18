import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LocaleSync from "@/components/feature/LocaleSync";
import BreadcrumbSeo from "@/components/feature/BreadcrumbSeo";
import LastModifiedSeo from "@/components/feature/LastModifiedSeo";
import OrganizationSeo from "@/components/feature/OrganizationSeo";
import ArticleSeo from "@/components/feature/ArticleSeo";
import ProductSeo from "@/components/feature/ProductSeo";
import ProjectSeo from "@/components/feature/ProjectSeo";
import LocalBusinessSeo from "@/components/feature/LocalBusinessSeo";
import WebSiteSearchSeo from "@/components/feature/WebSiteSearchSeo";
import MobileRuntime from "@/components/feature/MobileRuntime";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <MobileRuntime />
        <LocaleSync />
        <LocalBusinessSeo />
        <WebSiteSearchSeo />
        <BreadcrumbSeo />
        <LastModifiedSeo />
        <OrganizationSeo />
        <ArticleSeo />
        <ProductSeo />
        <ProjectSeo />
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
