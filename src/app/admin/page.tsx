import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { COURSE_NAME } from "@/lib/constants";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isLoggedIn()) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="mb-1 text-2xl font-semibold">Admin</h1>
      <p className="mb-6 text-sm text-slate-600">{COURSE_NAME} — feedback submissions</p>
      <LoginForm />
    </main>
  );
}
