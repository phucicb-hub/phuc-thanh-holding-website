/* eslint-disable react-refresh/only-export-components -- route helper is intentionally colocated */
import type { RouteObject } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { resolveLocaleFromStorage } from "@/lib/routes";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import CompanyVerification from "@/pages/verification/page";
import AiProduct from "@/pages/ai-product/page";
import Technology from "@/pages/technology/page";
import Products from "@/pages/products/page";
import Overview from "@/pages/overview/page";
import Fields from "@/pages/fields/page";
import Projects from "@/pages/projects/page";
import News from "@/pages/news/page";
import NewsDetail from "@/pages/news/detail/page";
import ProductDetail from "@/pages/products/detail/page";
import PtLms from "@/pages/products/pt-lms/page";
import PtClinic from "@/pages/products/pt-clinic/page";
import PtDatalake from "@/pages/products/pt-datalake/page";
import ProjectDetail from "@/pages/projects/detail/page";
import Careers from "@/pages/careers/page";
import Contact from "@/pages/contact/page";
import Sitemap from "@/pages/sitemap/page";
import Search from "@/pages/search/page";
import Training from "@/pages/training/page";
import Software from "@/pages/software/page";
import Digital from "@/pages/digital/page";
import Data from "@/pages/data/page";
import Investment from "@/pages/investment/page";
import Media from "@/pages/media/page";
import Services from "@/pages/services/page";
import TermsConditions from "@/pages/legal/terms/page";
import { lazy, Suspense } from "react";
import ServiceTerms from "@/pages/legal/service-terms/page";
import Privacy from "@/pages/legal/privacy/page";
import Disclaimer from "@/pages/legal/disclaimer/page";
import Network from "@/pages/legal/network/page";
import AdminLoadingState from "@/pages/admin/components/AdminLoadingState";

const AdminLogin = lazy(() => import("@/pages/admin/login/page"));
const AdminLayout = lazy(() => import("@/pages/admin/components/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard/page"));
const AdminNews = lazy(() => import("@/pages/admin/news/page"));
const AdminProjects = lazy(() => import("@/pages/admin/projects/page"));
const AdminProducts = lazy(() => import("@/pages/admin/products/page"));
const AdminOrders = lazy(() => import("@/pages/admin/orders/page"));
const AdminContacts = lazy(() => import("@/pages/admin/contacts/page"));

function RedirectSplat({ to }: { to: string }) {
  const params = useParams();
  const splat = params["*"] || "";
  return <Navigate to={splat ? `${to}/${splat}` : to} replace />;
}

const routes: RouteObject[] = [
  { path: '/en/technology', element: <Technology /> },
  { path: '/vi/cong-nghe', element: <Technology /> },
  { path: '/en/about', element: <Overview /> },
  { path: '/vi/xac-minh-doanh-nghiep', element: <CompanyVerification /> },
  { path: '/en/company-verification', element: <CompanyVerification /> },
  { path: '/vi/san-pham-ai', element: <AiProduct /> },
  { path: '/en/ai-products', element: <AiProduct /> },
  { path: '/en/ai-product', element: <Navigate to="/en/ai-products" replace /> },
  // Root → saved/browser locale
  {
    path: "/",
    element: <Navigate to={`/${resolveLocaleFromStorage()}`} replace />,
  },

  // Home
  { path: "/vi", element: <Home /> },
  { path: "/en", element: <Home /> },

  // About
  { path: "/vi/ve-phuc-thanh/tong-quan", element: <Overview /> },
  { path: "/en/about/overview", element: <Overview /> },

  // Business fields
  { path: "/vi/linh-vuc-hoat-dong", element: <Fields /> },
  { path: "/en/business-areas", element: <Fields /> },

  // Field sub-pages
  {
    path: "/vi/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc",
    element: <Training />,
  },
  {
    path: "/en/business-areas/training-human-resource-development",
    element: <Training />,
  },
  {
    path: "/vi/linh-vuc/chuyen-doi-so-doanh-nghiep",
    element: <Digital />,
  },
  {
    path: "/en/business-areas/digital-transformation",
    element: <Digital />,
  },
  {
    path: "/vi/linh-vuc/quan-tri-phan-tich-du-lieu",
    element: <Data />,
  },
  {
    path: "/en/business-areas/data-management-analytics",
    element: <Data />,
  },
  {
    path: "/vi/linh-vuc/dau-tu-cong-nghe",
    element: <Investment />,
  },
  {
    path: "/en/business-areas/investment-technology",
    element: <Investment />,
  },
  {
    path: "/vi/linh-vuc/truyen-thong-noi-dung-so",
    element: <Media />,
  },
  {
    path: "/en/business-areas/digital-media-content",
    element: <Media />,
  },

  // Services
  { path: "/vi/dich-vu", element: <Services /> },
  { path: "/en/services", element: <Services /> },
  { path: "/vi/dich-vu/phan-mem-theo-yeu-cau", element: <Software /> },
  { path: "/en/services/custom-software-development", element: <Software /> },

  // Products
  { path: "/vi/san-pham", element: <Products /> },
  { path: "/en/products", element: <Products /> },
  { path: "/vi/san-pham/pt-lms", element: <PtLms /> },
  { path: "/en/products/pt-lms", element: <PtLms /> },
  { path: "/vi/san-pham/pt-clinic", element: <PtClinic /> },
  { path: "/en/products/pt-clinic", element: <PtClinic /> },
  { path: "/vi/san-pham/pt-datalake", element: <PtDatalake /> },
  { path: "/en/products/pt-datalake", element: <PtDatalake /> },
  { path: "/vi/san-pham/:id", element: <ProductDetail /> },
  { path: "/en/products/:id", element: <ProductDetail /> },

  // Projects
  { path: "/vi/du-an", element: <Projects /> },
  { path: "/en/projects", element: <Projects /> },
  { path: "/vi/du-an/:id", element: <ProjectDetail /> },
  { path: "/en/projects/:id", element: <ProjectDetail /> },

  // News
  { path: "/vi/tin-tuc", element: <News /> },
  { path: "/en/news", element: <News /> },
  { path: "/vi/tin-tuc/:id", element: <NewsDetail /> },
  { path: "/en/news/:id", element: <NewsDetail /> },

  // Careers
  { path: "/vi/tuyen-dung", element: <Careers /> },
  { path: "/en/careers", element: <Careers /> },

  // Contact & partnership
  { path: "/vi/lien-he", element: <Contact /> },
  { path: "/en/contact", element: <Contact /> },
  { path: "/vi/lien-he-hop-tac", element: <Contact /> },
  { path: "/en/partnership-contact", element: <Contact /> },

  // Sitemap
  { path: "/vi/so-do-trang", element: <Sitemap /> },
  { path: "/en/sitemap", element: <Sitemap /> },

  // Search
  { path: "/vi/tim-kiem", element: <Search /> },
  { path: "/en/search", element: <Search /> },

  // Legal
  { path: "/vi/dieu-khoan", element: <TermsConditions /> },
  { path: "/en/terms-conditions", element: <TermsConditions /> },
  { path: "/vi/dieu-khoan-dich-vu", element: <ServiceTerms /> },
  { path: "/en/service-terms", element: <ServiceTerms /> },
  { path: "/vi/chinh-sach-quyen-rieng-tu", element: <Privacy /> },
  { path: "/en/privacy-policy", element: <Privacy /> },
  { path: "/vi/khuyen-cao", element: <Disclaimer /> },
  { path: "/en/disclaimer", element: <Disclaimer /> },
  { path: "/vi/mang-luoi", element: <Network /> },
  { path: "/en/network", element: <Network /> },

  // Admin (unchanged — no locale prefix)
  {
    path: "/admin/dang-nhap",
    element: (
      <Suspense fallback={<AdminLoadingState />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<AdminLoadingState />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { path: 'lien-he', element: <Suspense fallback={<AdminLoadingState />}><AdminContacts /></Suspense> },
      {
        index: true,
        element: (
          <Suspense fallback={<AdminLoadingState />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "tin-tuc",
        element: (
          <Suspense fallback={<AdminLoadingState />}>
            <AdminNews />
          </Suspense>
        ),
      },
      {
        path: "du-an",
        element: (
          <Suspense fallback={<AdminLoadingState />}>
            <AdminProjects />
          </Suspense>
        ),
      },
      {
        path: "san-pham",
        element: (
          <Suspense fallback={<AdminLoadingState />}>
            <AdminProducts />
          </Suspense>
        ),
      },
      {
        path: "don-hang",
        element: (
          <Suspense fallback={<AdminLoadingState />}>
            <AdminOrders />
          </Suspense>
        ),
      },
    ],
  },

  // Legacy redirects — old unprefixed Vietnamese paths
  { path: "/san-pham/*", element: <RedirectSplat to="/vi/san-pham" /> },
  { path: "/tin-tuc/*", element: <RedirectSplat to="/vi/tin-tuc" /> },
  { path: "/du-an/*", element: <RedirectSplat to="/vi/du-an" /> },
  {
    path: "/linh-vuc/phat-trien-phan-mem",
    element: <Navigate to="/vi/dich-vu/phan-mem-theo-yeu-cau" replace />,
  },
  { path: "/linh-vuc", element: <Navigate to="/vi/linh-vuc-hoat-dong" replace /> },
  { path: "/linh-vuc/*", element: <RedirectSplat to="/vi/linh-vuc" /> },
  { path: "/tong-quan", element: <Navigate to="/vi/ve-phuc-thanh/tong-quan" replace /> },
  { path: "/dich-vu", element: <Navigate to="/vi/dich-vu" replace /> },
  { path: "/tuyen-dung", element: <Navigate to="/vi/tuyen-dung" replace /> },
  { path: "/lien-he", element: <Navigate to="/vi/lien-he" replace /> },
  { path: "/so-do-trang", element: <Navigate to="/vi/so-do-trang" replace /> },
  { path: "/dieu-khoan", element: <Navigate to="/vi/dieu-khoan" replace /> },
  { path: "/dieu-khoan-dich-vu", element: <Navigate to="/vi/dieu-khoan-dich-vu" replace /> },
  {
    path: "/chinh-sach-bao-mat",
    element: <Navigate to="/vi/chinh-sach-quyen-rieng-tu" replace />,
  },
  { path: "/khuyen-cao", element: <Navigate to="/vi/khuyen-cao" replace /> },
  { path: "/mang-luoi", element: <Navigate to="/vi/mang-luoi" replace /> },

  // Courtesy English slug redirects
  { path: "/products", element: <Navigate to="/en/products" replace /> },
  { path: "/news", element: <Navigate to="/en/news" replace /> },
  { path: "/contact", element: <Navigate to="/en/contact" replace /> },
  { path: "/careers", element: <Navigate to="/en/careers" replace /> },
  { path: "/projects", element: <Navigate to="/en/projects" replace /> },

  // 404
  { path: "*", element: <NotFound /> },
];

export default routes;
