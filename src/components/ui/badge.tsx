import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        secondary: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        error: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        outline: "border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
