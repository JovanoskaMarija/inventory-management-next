import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseInputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input ref={ref} className={cn(baseInputClass, className)} {...props} />
    );
  },
);

Input.displayName = "Input";
