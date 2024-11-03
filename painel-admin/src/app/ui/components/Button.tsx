import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  label: string;
  disabled?: boolean;
};

const Button = ({ label, disabled = false }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      type="submit"
      className="mt-10 bg-white text-[#080710] p-4 text-lg font-semibold rounded-md hover:bg-opacity-90 transition-all"
    >
      {label}
    </motion.button>
  );
};

export default Button;
