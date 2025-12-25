export const ROUTES = {
  HOME: '/',
  CASE_STUDIES: '/case-studies',
  CASE_STUDY: (slug: string) => `/case-studies/${slug}`,
  ABOUT: '/about',
  CAREER: '/careers',
  CONTACT: '/contact',
  ADMIN: {
    INDEX: '/admin',
    LOGIN: '/admin/login',
    FAQS: '/admin/faqs',
    PROJECTS: '/admin/projects',
    ADD_PROJECT: '/admin/projects/add',
    EDIT_PROJECT: (id: string) => `/admin/projects/edit/${id}`,
    TESTIMONIALS: '/admin/testimonials',
    ADD_TESTIMONIAL: '/admin/testimonials/add',
    EDIT_TESTIMONIAL: (id: string) => `/admin/testimonials/edit/${id}`,
  },
} as const;
