import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/constants/routes";
import Layout from "@/layout/layout";

// Lazy load pages
const AboutPage = lazy(() => import("@/pages/about"));
const CareersPage = lazy(() => import("@/pages/career"));
const ProjectsPage = lazy(() => import("@/pages/case-studies"));
const ProjectPage = lazy(() => import("@/pages/case-studies/[slug]"));
const ContactPage = lazy(() => import("@/pages/contact"));
const HomePage = lazy(() => import("@/pages/home"));

// Loading fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-black text-white">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CASE_STUDIES,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "/case-studies/:slug",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ABOUT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CAREER,
        element: (
          <Suspense fallback={<PageLoader />}>
            <CareersPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONTACT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
]);
