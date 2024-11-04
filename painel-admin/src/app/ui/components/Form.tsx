"use client";

import { login } from "@/app/login/actions";
import { useActionState } from "react";
import Button from "./Button";

const Form = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form
      action={formAction}
      className="relative w-[400px] h-[520px] bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 rounded-lg shadow-lg p-10 text-white flex flex-col justify-center"
    >
      <h3 className="text-2xl font-semibold text-center mb-8">
        Entrar no dashboard
      </h3>

      <input
        type="email"
        id="email"
        name="email"
        placeholder="E-mail"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
      />

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
      />
      <br />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <Button disabled={isPending} label="Entrar" type="submit" />
    </form>
  );
};

export default Form;
