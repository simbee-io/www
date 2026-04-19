"use client"

import { Button as BaseButton, buttonVariants } from "@skeptik/ui"
import { Loader2 } from "lucide-react"
import type { ComponentProps } from "react"

type ButtonProps = ComponentProps<typeof BaseButton> & {
  loading?: boolean
}

function Button({ loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <BaseButton disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </BaseButton>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
