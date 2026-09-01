import { passwordStrength } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const score = passwordStrength(password);

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={cn("h-1 flex-1 rounded-full bg-ink/10", i < score && COLORS[score])} />
        ))}
      </div>
      <p className="text-xs text-ink/45">{LABELS[score]}</p>
    </div>
  );
}
