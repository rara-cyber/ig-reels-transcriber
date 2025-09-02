import { z } from 'zod';

// Instagram Reel URL validation schema
export const instagramReelSchema = z.object({
  reelUrl: z
    .string()
    .min(1, 'Instagram Reel URL is required')
    .url('Please enter a valid URL')
    .refine(
      (url) => {
        const instagramRegex = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(reel|reels|p)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
        return instagramRegex.test(url);
      },
      'Please enter a valid Instagram Reel URL (e.g., https://instagram.com/reel/ABC123/)'
    ),
});

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
});

// Combined form validation schema
export const transcriptionFormSchema = z.object({
  email: emailSchema.shape.email,
  reelUrl: instagramReelSchema.shape.reelUrl,
});

// Type inference from schema
export type TranscriptionFormData = z.infer<typeof transcriptionFormSchema>;

// Validation helpers
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse({ email });
    return true;
  } catch {
    return false;
  }
};

export const validateInstagramUrl = (url: string): boolean => {
  try {
    instagramReelSchema.parse({ reelUrl: url });
    return true;
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  return url.trim().replace(/\/+$/, ''); // Remove trailing slashes and whitespace
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};