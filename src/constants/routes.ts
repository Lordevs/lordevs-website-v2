export const ROUTES = {
  HOME: "/",
  CASE_STUDIES: "/case-studies",
  CASE_STUDY: (slug: string) => `/case-studies/${slug}`,
  ABOUT: "/about",
  CAREER: "/careers",
  CAREER_APPLY: "/careers/apply-for-job",
  CONTACT: "/contact",
} as const;
