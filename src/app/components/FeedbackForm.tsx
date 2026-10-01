"use client";

import { useActionState } from "react";
import { submitFeedback, type FeedbackFormState } from "@/app/actions";
import StarRating from "./StarRating";

const initialState: FeedbackFormState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink shadow-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export default function FeedbackForm() {
  const [state, formAction, pending] = useActionState(submitFeedback, initialState);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-emerald-600" aria-hidden="true">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Thank you!</h2>
        <p className="mt-2 text-slate-600">
          Your feedback has been recorded. We really appreciate you taking the time.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {state.message && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium">
          Full name
        </label>
        <input id="full_name" name="full_name" type="text" maxLength={200} className={inputClass} />
        <FieldError message={errors.full_name} />
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
          Company
        </label>
        <input id="company" name="company" type="text" maxLength={200} className={inputClass} />
        <FieldError message={errors.company} />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium">How would you rate the course?</span>
        <StarRating name="rating" />
        <FieldError message={errors.rating} />
      </div>

      <div>
        <label htmlFor="testimonial" className="mb-1.5 block text-sm font-medium">
          Your testimonial
        </label>
        <textarea
          id="testimonial"
          name="testimonial"
          rows={6}
          maxLength={5000}
          placeholder="What did you find most useful? What changed for you?"
          className={inputClass}
        />
        <FieldError message={errors.testimonial} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-ink transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit feedback"}
      </button>
    </form>
  );
}
