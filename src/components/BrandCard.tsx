import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandCardProps {
  name: string;
  cashback: string;
  previousRate?: string;
  logo: string;
  bgColor?: string;
  variant?: "grid" | "list" | "deal";
  description?: string;
  image?: string;
  actionLabel?: string;
  tag?: string;
}

export default function BrandCard({
  name,
  cashback,
  previousRate,
  logo,
  bgColor = "bg-secondary",
  variant = "grid",
  description,
  image,
  actionLabel = "Shop",
  tag,
}: BrandCardProps) {
  if (variant === "list") {
    return (
      <div className="flex items-center justify-between py-4 border-b last:border-0 group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xl font-bold text-primary shrink-0">
            {logo}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-cashback text-sm font-semibold">{cashback}</span>
            {previousRate && <span className="text-muted-foreground text-xs ml-1.5">was {previousRate}</span>}
          </div>
        </div>
        <Button variant="outline" size="sm" className="rounded-full text-primary border-primary hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity">
          {actionLabel}
        </Button>
      </div>
    );
  }

  if (variant === "deal") {
    return (
      <div className="group cursor-pointer">
        <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-secondary">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">{logo}</div>
          )}
          <div className="absolute bottom-3 right-3">
            <Button size="sm" variant="outline" className="rounded-full bg-background/90 text-sm font-medium shadow-sm">
              {actionLabel}
            </Button>
          </div>
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-background shadow flex items-center justify-center text-sm font-bold">
            {logo}
          </div>
        </div>
        <h3 className="font-semibold text-foreground text-sm">{name}</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-cashback text-sm font-semibold">{cashback}</span>
          {previousRate && <span className="text-muted-foreground text-xs">was {previousRate}</span>}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>}
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className={`${bgColor} rounded-xl aspect-[3/2] flex items-center justify-center p-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]`}>
        <span className="text-3xl font-extrabold text-foreground/80">{logo}</span>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm text-foreground">{name}</span>
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-cashback text-sm font-semibold">{cashback}</span>
          {previousRate && <span className="text-muted-foreground text-xs">was {previousRate}</span>}
        </div>
        {tag && (
          <span className="inline-flex items-center gap-1 text-xs text-primary bg-accent px-2 py-0.5 rounded-full mt-1">
            ⭐ {tag}
          </span>
        )}
      </div>
    </div>
  );
}