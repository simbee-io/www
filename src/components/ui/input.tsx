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
          "flex h-10 w-full rounded-md border bg-surface-raised px-3 py-2 text-sm transition-colors",
          "placeholder:text-text-tertiary",
          "focus:outline-2 focus:outline-offset-1 focus:outline-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-error focus:outline-error"
            : "border-border hover:border-border-strong",
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
