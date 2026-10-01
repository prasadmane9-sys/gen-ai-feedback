"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-ink focus:ring-1 focus:ring-ink"
        />
        {state.error && <p className="mt-1 text-sm text-red-600">{state.error}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
