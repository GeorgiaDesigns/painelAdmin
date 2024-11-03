"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type State = {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string | null;
};

const checkEmailExists = async (email: string) => {
  const mockDatabaseEmails = ["test@exemplo.com", "usuario@codako.com"];
  return mockDatabaseEmails.includes(email);
};

// const loginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("E-mail não válido")
//     .required("Por favor, digite o seu e-mail")
//     .test("email-exists", "Email não encontrado no sistema", async (value) => {
//       if (!value) return false;
//       return await checkEmailExists(value);
//     }),
//   password: Yup.string().required("Por favor, insira a senha"),
// });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: string | undefined, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  console.log(result);
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
        email: ["Invalid email or password"],
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
