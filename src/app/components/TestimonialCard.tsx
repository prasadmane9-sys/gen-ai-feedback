import type { PublicTestimonial } from "@/lib/db";

export default function TestimonialCard({ item }: { item: PublicTestimonial }) {
  return (
    <figure className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 whitespace-nowrap" aria-label={`${item.rating} out of 5 stars`}>
        <span aria-hidden="true" className="text-brand-dark">
          {"★".repeat(item.rating)}
        </span>
        <span aria-hidden="true" className="text-slate-300">
          {"★".repeat(5 - item.rating)}
        </span>
      </div>
      <blockquote className="whitespace-pre-line text-slate-700">{item.testimonial}</blockquote>
      <figcaption className="mt-3 text-sm">
        <span className="font-medium">{item.full_name}</span>
        <span className="text-slate-500"> · {item.company}</span>
      </figcaption>
    </figure>
  );
}
