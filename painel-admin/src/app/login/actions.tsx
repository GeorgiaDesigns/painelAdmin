"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { usuariosTeste } from "@/mock-users";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).trim(),
  password: z
    .string()
    .min(8, { message: "A senha deverá conter pelo menos 8 caracteres" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user = usuariosTeste.find((user) => user.email === email);

  if (!user) return;

  if (email !== user.email || password !== user.password) {
    return {
      errors: {
        email: ["E-mail ou senha inválidos"],
      },
    };
  }

  await createSession(user.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
