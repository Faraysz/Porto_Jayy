export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  detailedContent?: string;
  techStack?: string[];
  features?: string[];
  year?: string;
  client?: string;
  duration?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name
  bgColor: string;   // e.g. 'bg-white', 'bg-primary-container', etc.
  borderColor: string; // e.g. 'border-on-surface'
  accentColor: string; // text/icon color accent
  bullets: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface EstimateSelection {
  services: string[]; // List of service ids selected
  scope: 'small' | 'medium' | 'large';
  timeline: number; // in weeks
  withDeploy: boolean;
  withMaintenance: boolean;
}
