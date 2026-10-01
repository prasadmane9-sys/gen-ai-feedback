import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Lazily-created Neon client.
 *
 * Created on first use rather than at module load so that a missing
 * DATABASE_URL surfaces as a request-time error with a clear message
 * instead of crashing the build.
 */
export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
    }
    client = neon(url);
  }
  return client;
}

export type Feedback = {
  id: string;
  course_name: string;
  full_name: string;
  company: string;
  rating: number;
  testimonial: string;
  created_at: string;
};

export type PublicTestimonial = Pick<Feedback, "id" | "full_name" | "company" | "rating" | "testimonial">;
