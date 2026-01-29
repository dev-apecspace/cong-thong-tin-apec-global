/**
 * TypeScript interfaces for CMS-driven corporate portal
 * All data is configurable and editable via a headless CMS
 */

export interface CMSProject {
  id: string;
  name: string;
  logo: string;
}

export interface CMSModule {
  id: string;
  title: string;
  description?: string;
  icon: string; // Icon name or SVG string
  order: number;
  isVisible: boolean;
  route: string;
  summary?: string; // Short overview for featured display
  webLink?: string; // External website link
  color?: string; // Optional color override
  backgroundImage?: string; // Background image for card
  projects?: CMSProject[]; // List of associated projects
  details?: Record<string, any>; // Dynamic details per company
}

export interface CompanyOverviewBlock {
  id: string;
  title: string;
  description: string;
  icon?: string;
  value?: string; // For metrics like "500+ employees"
  order: number;
  isVisible: boolean;
}

export interface SiteConfiguration {
  projects: CMSProject[];
  company: {
    name: string;
    logo: string; // Logo URL
    logoAlt: string;
    slogan?: string;
    shortName?: string; // e.g., "APEC"
    brandName?: string; // e.g., "GLOBAL"
  };
  header: {
    sticky: boolean;
    bgColor?: string;
  };
  overviewSection: {
    title: string;
    description?: string;
    blocks: CompanyOverviewBlock[];
  };
  moduleNavigation: {
    title: string;
    description?: string;
    modules: CMSModule[];
  };
  footer: {
    videoUrl: string; // YouTube or internal video URL
    videoTitle?: string;
    copyright: string;
  };
}

export interface PageData {
  config: SiteConfiguration;
}
