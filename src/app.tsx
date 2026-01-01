import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/constants/routes";
import Layout from "@/layout/layout";
import AdminLayout from "@/layout/admin-layout";

// Lazy load pages
const AboutPage = lazy(() => import("@/pages/about"));
const CareersPage = lazy(() => import("@/pages/career"));
const ProjectsPage = lazy(() => import("@/pages/case-studies"));
const ProjectPage = lazy(() => import("@/pages/case-studies/[slug]"));
const NewsDetailPage = lazy(() => import("@/pages/news/[slug]"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ApplyJobPage = lazy(() => import("@/pages/career/apply-for-job"));
const NewsPage = lazy(() => import("@/pages/news"));
const HomePage = lazy(() => import("@/pages/home"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy"));
const CookiesPolicyPage = lazy(() => import("@/pages/cookies-policy"));
const TermsConditionsPage = lazy(() => import("@/pages/terms-conditions"));

// Admin Pages
const AdminLoginPage = lazy(() => import("@/pages/admin/login"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/(dashboard)"));
const AdminFAQsPage = lazy(() => import("@/pages/admin/(dashboard)/faqs"));
const AdminProjectsPage = lazy(
    () => import("@/pages/admin/(dashboard)/projects")
);
const AdminAddProjectPage = lazy(
    () => import("@/pages/admin/(dashboard)/projects/add")
);
const AdminEditProjectPage = lazy(
    () => import("@/pages/admin/(dashboard)/projects/edit/[id]")
);
const AdminTestimonialsPage = lazy(
    () => import("@/pages/admin/(dashboard)/testimonials")
);
const AdminAddTestimonialPage = lazy(
    () => import("@/pages/admin/(dashboard)/testimonials/add")
);
const AdminEditTestimonialPage = lazy(
    () => import("@/pages/admin/(dashboard)/testimonials/edit/[id]")
);
const AdminNewsPage = lazy(() => import("@/pages/admin/(dashboard)/news"));
const AdminAddNewsPage = lazy(
    () => import("@/pages/admin/(dashboard)/news/add")
);
const AdminEditNewsPage = lazy(
    () => import("@/pages/admin/(dashboard)/news/edit/[id]")
);
const AdminCareersPage = lazy(
    () => import("@/pages/admin/(dashboard)/careers")
);
const AdminAddCareerPage = lazy(
    () => import("@/pages/admin/(dashboard)/careers/add")
);
const AdminEditCareerPage = lazy(
    () => import("@/pages/admin/(dashboard)/careers/edit/[id]")
);
const AdminJobApplicationsPage = lazy(
    () => import("@/pages/admin/(dashboard)/job-application")
);

import { PageLoader } from "@/components/common/page-loader";

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
                path: ROUTES.CAREER_APPLY,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <ApplyJobPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.NEWS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <NewsPage />
                    </Suspense>
                ),
            },
            {
                path: "/news/:slug",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <NewsDetailPage />
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
            {
                path: ROUTES.PRIVACY_POLICY,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <PrivacyPolicyPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.COOKIES_POLICY,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <CookiesPolicyPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.TERMS_CONDITIONS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <TermsConditionsPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: ROUTES.ADMIN.LOGIN,
        element: (
            <Suspense fallback={<PageLoader />}>
                <AdminLoginPage />
            </Suspense>
        ),
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: ROUTES.ADMIN.INDEX,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminDashboardPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.FAQS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminFAQsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.PROJECTS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminProjectsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.ADD_PROJECT,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminAddProjectPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.EDIT_PROJECT(":id"),
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminEditProjectPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.TESTIMONIALS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminTestimonialsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.ADD_TESTIMONIAL,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminAddTestimonialPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.EDIT_TESTIMONIAL(":id"),
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminEditTestimonialPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.NEWS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminNewsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.ADD_NEWS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminAddNewsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.EDIT_NEWS(":id"),
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminEditNewsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.CAREERS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminCareersPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.ADD_CAREER,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminAddCareerPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.EDIT_CAREER(":id"),
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminEditCareerPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ADMIN.JOB_APPLICATIONS,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminJobApplicationsPage />
                    </Suspense>
                ),
            },
        ],
    },
]);
