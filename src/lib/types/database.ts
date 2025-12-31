import type { IconName } from "@/components/ui/icon-picker";

// Supporting types
export interface ProjectSection {
  id: string;
  title: string;
  description: string;
  isGrid: boolean;
  screenshots: string[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Testimonial {
  id: string;
  image: string;
  name: string;
  country: string;
  content: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          pages: string[];
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          pages: string[];
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          pages?: string[];
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          subtitle: string;
          tagline: string | null;
          project_slug: string;
          tags: string[];
          main_image: string;
          live_url: string | null;
          services: string;
          categories: string;
          sections: ProjectSection[];
          features: ProjectFeature[];
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle: string;
          tagline: string | null;
          project_slug: string;
          tags: string[];
          main_image: string;
          live_url?: string | null;
          services: string;
          categories: string;
          sections: ProjectSection[];
          features: string[];
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string;
          tagline?: string | null;
          project_slug?: string;
          tags?: string[];
          main_image?: string;
          live_url?: string | null;
          services?: string;
          categories?: string;
          sections?: ProjectSection[];
          features?: string[];
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          image: string;
          name: string;
          country: string;
          content: string;
          rating: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image: string;
          name: string;
          country: string;
          content: string;
          rating?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image?: string;
          name?: string;
          country?: string;
          content?: string;
          rating?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          thumbnail_url: string | null;
          is_active: boolean;
          order_index: number;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          thumbnail_url?: string | null;
          is_active?: boolean;
          order_index?: number;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          thumbnail_url?: string | null;
          is_active?: boolean;
          order_index?: number;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      careers: {
        Row: {
          id: string;
          title: string;
          features: string[];
          tags: string[];
          is_active: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          features?: string[];
          tags?: string[];
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          features?: string[];
          tags?: string[];
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      job_applications: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone_number: string;
          message: string;
          role: string;
          resume_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone_number: string;
          message: string;
          role: string;
          resume_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone_number?: string;
          message?: string;
          role?: string;
          resume_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type FAQ = Database["public"]["Tables"]["faqs"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type TestimonialRow =
  Database["public"]["Tables"]["testimonials"]["Row"];
export type NewsRow = Database["public"]["Tables"]["news"]["Row"];
export type CareerRow = Database["public"]["Tables"]["careers"]["Row"];
