"use server";

import { getSql, type PublicTestimonial } from "@/lib/db";
import { COURSE_NAME, PUBLIC_MIN_RATING, PUBLIC_TESTIMONIAL_LIMIT } from "@/lib/constants";

export type FeedbackFormState = {
  status: "idle" | "error" | "success";
  errors?: Record<string, string>;
  message?: string;
};

const MAX_SHORT = 200;
const MAX_TESTIMONIAL = 5000;

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitFeedback(
  _prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const fullName = readText(formData, "full_name");
  const company = readText(formData, "company");
  const testimonial = readText(formData, "testimonial");
  const ratingRaw = readText(formData, "rating");

  const errors: Record<string, string> = {};

  if (!fullName) errors.full_name = "Please enter your name.";
  else if (fullName.length > MAX_SHORT) errors.full_name = "That name is too long.";

  if (!company) errors.company = "Please enter your company.";
  else if (company.length > MAX_SHORT) errors.company = "That company name is too long.";

  const rating = Number(ratingRaw);
  if (!ratingRaw || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Please pick a rating from 1 to 5 stars.";
  }

  if (!testimonial) errors.testimonial = "Please write a short testimonial.";
  else if (testimonial.length > MAX_TESTIMONIAL) errors.testimonial = "That testimonial is too long.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  try {
    const sql = getSql();
    await sql`
      insert into feedback (course_name, full_name, company, rating, testimonial)
      values (${COURSE_NAME}, ${fullName}, ${company}, ${rating}, ${testimonial})
    `;
  } catch (error) {
    console.error("Failed to save feedback:", error);
    return {
      status: "error",
      message: "Sorry — we couldn't save your feedback. Please try again in a moment.",
    };
  }

  return { status: "success" };
}

/** Public list: only high ratings, and only the columns safe to show. */
export async function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  try {
    const sql = getSql();
    return (await sql`
      select id, full_name, company, rating, testimonial
      from feedback
      where rating >= ${PUBLIC_MIN_RATING}
      order by created_at desc
      limit ${PUBLIC_TESTIMONIAL_LIMIT}
    `) as PublicTestimonial[];
  } catch (error) {
    // The form must still work if the list can't load.
    console.error("Failed to load testimonials:", error);
    return [];
  }
}
