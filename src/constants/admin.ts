// Available pages for FAQ assignment
export const AVAILABLE_PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers" },
  { id: "all", label: "All Pages" },
] as const;

// FAQ form data interface
export interface FAQFormData {
  question: string;
  answer: string;
  pages: string[];
  order_index: number;
  is_active: boolean;
}

// Filter options
export const FILTER_OPTIONS = {
  status: [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ],
  pages: [
    { value: "all", label: "All Pages" },
    ...AVAILABLE_PAGES.map((page) => ({ value: page.id, label: page.label })),
  ],
} as const;

// Animation variants
export const ANIMATION_VARIANTS = {
  modal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modalContent: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
} as const;

// Stats card configurations for different admin sections
export const STATS_CARD_CONFIGS = {
  faq: {
    total: {
      title: "Total FAQs",
      color: "blue" as const,
      description: "All FAQ entries",
    },
    active: {
      title: "Active FAQs",
      color: "green" as const,
      description: "Currently visible FAQs",
    },
    inactive: {
      title: "Inactive FAQs",
      color: "red" as const,
      description: "Hidden FAQ entries",
    },
    pages: {
      title: "Pages",
      color: "purple" as const,
      description: "Available page assignments",
    },
  },
  project: {
    total: {
      title: "Total Projects",
      color: "purple" as const,
      description: "All project entries",
    },
    featured: {
      title: "Featured Projects",
      color: "orange" as const,
      description: "Highlighted projects",
    },
    active: {
      title: "Active Projects",
      color: "green" as const,
      description: "Currently visible projects",
    },
    inactive: {
      title: "Inactive Projects",
      color: "red" as const,
      description: "Hidden project entries",
    },
  },
  testimonials: {
    total: {
      title: "Total Testimonials",
      color: "blue" as const,
      description: "All testimonial entries",
    },
    active: {
      title: "Active Testimonials",
      color: "green" as const,
      description: "Currently visible testimonials",
    },
    inactive: {
      title: "Inactive Testimonials",
      color: "red" as const,
      description: "Hidden testimonial entries",
    },
  },
} as const;

// Default search debounce delay (ms)
export const SEARCH_DEBOUNCE_DELAY = 300;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
