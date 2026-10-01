import FeedbackForm from "./components/FeedbackForm";
import TestimonialCard from "./components/TestimonialCard";
import { getPublicTestimonials } from "./actions";
import { COURSE_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const testimonials = await getPublicTestimonials();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Course feedback</p>
        <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{COURSE_NAME}</h1>
        <p className="mt-3 text-slate-600">
          Thanks for attending. This takes about a minute — your answers help shape the next cohort.
        </p>
      </header>

      <FeedbackForm />

      {testimonials.length > 0 && (
        <section className="mt-14" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="mb-4 text-xl font-semibold">
            What past participants say
          </h2>
          <div className="space-y-4">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
