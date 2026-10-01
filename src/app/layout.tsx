import type { Metadata } from "next";
import { COURSE_NAME } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COURSE_NAME} — Feedback`,
  description: `Share your feedback on ${COURSE_NAME}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
