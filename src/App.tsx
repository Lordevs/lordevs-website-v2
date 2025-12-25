import { Route, Routes } from "react-router";
import { ROUTES } from "@/constants/routes";
import Layout from "@/layout/layout";
import AboutPage from "@/pages/about";
import CareersPage from "@/pages/career";
import ProjectsPage from "@/pages/case-studies";
import ProjectPage from "@/pages/case-studies/[slug]";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CASE_STUDIES} element={<ProjectsPage />} />
        {/* 
           ROUTES.CASE_STUDY is a function (slug) => string.
           We need the path pattern here. 
           Extraction: '/case-studies/:slug' matches the pattern implied by the function.
        */}
        <Route path="/case-studies/:slug" element={<ProjectPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CAREER} element={<CareersPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
