import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-all",
          "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
          "focus:outline-2 focus:outline-offset-1 focus:outline-amber-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-neutral-900 dark:text-neutral-100",
          error
            ? "border-red-500 focus:outline-red-500"
            : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
