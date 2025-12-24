export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  technologies: string;
  githubLink?: string | null;
  liveLink?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Other' | string;
  proficiency: number; // 0-100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
}

export interface About {
  id: string;
  bio: string;
  imageUrl?: string | null;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: string | null;
}
