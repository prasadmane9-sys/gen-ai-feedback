import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getSql, type Feedback } from "@/lib/db";
import { COURSE_NAME, DISPLAY_LOCALE, DISPLAY_TIME_ZONE } from "@/lib/constants";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat(DISPLAY_LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: DISPLAY_TIME_ZONE,
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="whitespace-nowrap" aria-label={`${rating} out of 5`}>
      <span aria-hidden="true" className="text-brand">
        {"★".repeat(rating)}
      </span>
      <span aria-hidden="true" className="text-slate-300">
        {"★".repeat(5 - rating)}
      </span>
    </span>
  );
}

export default async function DashboardPage() {
  if (!(await isLoggedIn())) {
    redirect("/admin");
  }

  const sql = getSql();
  const rows = (await sql`
    select id, course_name, full_name, company,
           rating, testimonial, created_at
    from feedback
    order by created_at desc
  `) as Feedback[];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Submissions</h1>
          <p className="text-sm text-slate-600">
            {COURSE_NAME} — {rows.length} {rows.length === 1 ? "response" : "responses"}
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
          >
            Log out
          </button>
        </form>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500">
          No submissions yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Course</th>
                <th scope="col" className="px-4 py-3 font-medium">Name</th>
                <th scope="col" className="px-4 py-3 font-medium">Company</th>
                <th scope="col" className="px-4 py-3 font-medium">Rating</th>
                <th scope="col" className="px-4 py-3 font-medium">Testimonial</th>
                <th scope="col" className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id} className="align-top hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-500">{row.course_name}</td>
                  <td className="px-4 py-3 font-medium">{row.full_name}</td>
                  <td className="px-4 py-3">{row.company}</td>
                  <td className="px-4 py-3">
                    <Stars rating={row.rating} />
                  </td>
                  <td className="max-w-md whitespace-pre-line px-4 py-3 text-slate-700">
                    {row.testimonial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {dateFormatter.format(new Date(row.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
