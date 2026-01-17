// All images are now served from Cloudflare R2
import { R2_IMAGE_MAP, R2_IMAGES, R2_VIDEOS } from './r2';

// Image path to R2 URL mapping for dynamic usage
export const IMAGE_MAP: Record<string, string> = R2_IMAGE_MAP;

// Re-export R2 images and videos for convenience
export { R2_IMAGES, R2_VIDEOS };
