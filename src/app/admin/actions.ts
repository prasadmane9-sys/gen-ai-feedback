"use server";

import { redirect } from "next/navigation";
import { endSession, isPasswordCorrect, startSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Please enter the password." };
  }

  if (!isPasswordCorrect(password)) {
    return { error: "Incorrect password." };
  }

  await startSession();
  redirect("/admin/dashboard");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin");
}
