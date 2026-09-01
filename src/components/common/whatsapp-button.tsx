"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  number: string | null;
  message: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  label?: string;
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
}

export function WhatsAppButton({
  number,
  message,
  className,
  variant = "outline",
  label = "WhatsApp Prime Tech",
  size = "default",
  disabled = false,
}: WhatsAppButtonProps) {
  if (!number) return null;

  const digits = number.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      render={<a href={disabled ? undefined : href} target="_blank" rel="noopener noreferrer" />}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn("gap-2", className)}
    >
      <MessageCircle className="size-4" />
      {label}
    </Button>
  );
}
