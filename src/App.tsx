import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/constants/routes";
import Layout from "@/layout/layout";
import AboutPage from "@/pages/about";
import CareersPage from "@/pages/career";
import ProjectsPage from "@/pages/case-studies";
import ProjectPage from "@/pages/case-studies/[slug]";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.CASE_STUDIES,
        element: <ProjectsPage />,
      },
      {
        path: "/case-studies/:slug",
        element: <ProjectPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.CAREER,
        element: <CareersPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
    ],
  },
]);
