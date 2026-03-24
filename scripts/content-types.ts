export const ANIMATION_CATEGORIES = [
  "hero",
  "background",
  "button",
  "text",
  "card",
  "loader",
  "nav",
  "other",
] as const;

export type AnimationCategory = (typeof ANIMATION_CATEGORIES)[number];

export interface AnimationMeta {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: AnimationCategory;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  componentPath: string;
}

export interface ValidationIssue {
  filePath: string;
  messages: string[];
}
