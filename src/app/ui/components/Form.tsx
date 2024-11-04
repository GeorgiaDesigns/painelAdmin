"use client";

import { login } from "@/app/login/actions";
import { useActionState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

const Form = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form
      action={formAction}
      className="relative w-[400px] h-[520px] bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 rounded-lg shadow-lg p-10 flex flex-col justify-center"
    >
      <h3 className="text-2xl font-semibold text-center mb-8">
        Entrar no dashboard
      </h3>

      <motion.input
        whileHover={{ opacity: 0.5 }}
        whileFocus={{ scale: 1.1 }}
        whileTap={{ border: "1.2 solid #fff" }}
        type="email"
        id="email"
        name="email"
        placeholder="E-mail"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
      />

      <motion.input
        whileHover={{ opacity: 0.5 }}
        whileFocus={{ scale: 1.1 }}
        whileTap={{ border: "1.2 solid #fff" }}
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
      />
      {state?.errors?.email && (
        <p className="text-red-500 pt-2">{state.errors.email}</p>
      )}

      {state?.errors?.password && (
        <p className="text-red-500 pt-2">{state.errors.password}</p>
      )}

      <Button disabled={isPending} label="Entrar" type="submit" />
    </form>
  );
};

export default Form;
