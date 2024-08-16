import { z } from "zod";

// Define the theme schema
const themeSchema = z.object({
  primary: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  secondary: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  background: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  textColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  muted: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
});

// Define the section schema
export const sectionSchema = z.object({
  title: z.string().min(2).max(100),
  id: z.string().min(2).max(50),
  content: z.string().min(10),
});

// Define the main config schema
export const formSchema = z.object({
  name: z.string().min(2).max(50),
  subline: z.string().min(10).max(100),
  username: z.string().min(2).max(50),
  website: z.string().url().optional(),
  createdAt: z.date({
    required_error: "Created At is required",
  }),
  updatedAt: z.date({
    required_error: "Updated At is required",
  }),
  email: z.string().email(),
  description: z.string().min(10).max(500),
  logo: z.string().url(),
  favicon: z.string().url(),
  theme: themeSchema,
  sections: z.array(sectionSchema).min(1), // Ensure there's at least one section
});
