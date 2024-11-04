import React, { ButtonHTMLAttributes } from "react";

import { motion, MotionProps } from "framer-motion";
export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  label: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
} & ButtonTypes &
  MotionProps;

const Button = ({
  label,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 1.1 }}
      disabled={disabled}
      type={type}
      {...props}
      className="mt-10 bg-white text-[#080710] p-4 text-lg font-semibold rounded-md hover:bg-opacity-90 transition-all"
    >
      {label}
    </motion.button>
  );
};

export default Button;
