"use client";

import { useState } from "react";

const STARS = [1, 2, 3, 4, 5];

export default function StarRating({ name }: { name: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const active = hovered || rating;

  return (
    <div>
      <input type="hidden" name={name} value={rating || ""} />
      <div
        role="radiogroup"
        aria-label="Overall rating"
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {STARS.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} star${value > 1 ? "s" : ""}`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHovered(value)}
            onFocus={() => setHovered(value)}
            onBlur={() => setHovered(0)}
            className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-9 w-9 ${value <= active ? "fill-brand" : "fill-slate-200"}`}
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3.05 1.11-6.47L2.6 9.35l6.5-.95L12 2.5z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-slate-500">
          {rating ? `${rating} of 5` : "Tap to rate"}
        </span>
      </div>
    </div>
  );
}
