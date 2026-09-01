import { MapPin, Phone, Clock } from "lucide-react";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Branch } from "@/types/database";

export function BranchCard({ branch }: { branch: Branch }) {
  const isActive = branch.status === "active";

  return (
    <div className="flex h-full flex-col rounded-3xl border border-ink/8 bg-paper p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{branch.name}</h3>
        <Badge variant={isActive ? "default" : "secondary"} className="shrink-0">
          {isActive ? "Open" : "Coming Soon"}
        </Badge>
      </div>

      <div className="mt-4 space-y-2.5 text-sm text-ink/60">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span>{branch.address ?? "Address to be confirmed"}{branch.city ? `, ${branch.city}` : ""}</span>
        </div>
        {branch.phone && (
          <div className="flex items-center gap-2.5">
            <Phone className="size-4 shrink-0" />
            <a href={`tel:${branch.phone}`} className="hover:text-ink">
              {branch.phone}
            </a>
          </div>
        )}
        {branch.hours && (
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-0.5">
              {Object.entries(branch.hours).map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {branch.services && branch.services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {branch.services.map((service) => (
            <span key={service} className="rounded-full bg-paper-soft px-2.5 py-1 text-xs text-ink/55">
              {service}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
        {branch.maps_url && (
          <Button variant="outline" className="flex-1 gap-2 rounded-full" render={<a href={branch.maps_url} target="_blank" rel="noopener noreferrer" />}>
            <MapPin className="size-4" />
            View Map
          </Button>
        )}
        <WhatsAppButton
          number={branch.whatsapp}
          message={`Hello Prime Tech, I have a question about the ${branch.name} branch.`}
          className="flex-1 rounded-full"
        />
      </div>
    </div>
  );
}
