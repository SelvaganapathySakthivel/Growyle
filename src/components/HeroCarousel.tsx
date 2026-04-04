import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import SplitText from "./SplitText";

interface HeroSlide {
  highlightText: string;
  cashbackAmount: string;
  productEmoji: string;
  brandName: string;
  brandDetail: string;
  brandIcon: string;
  bgColorClass: string;
  decoColor: string;
}

const slides: HeroSlide[] = [
  {
    highlightText: "shop online",
    cashbackAmount: "$8.28",
    productEmoji: "🧴",
    brandName: "Ulta Beauty",
    brandDetail: "Skincare Essentials",
    brandIcon: "UB",
    bgColorClass: "bg-[hsl(340_80%_92%)]",
    decoColor: "hsl(340, 80%, 85%)",
  },
  {
    highlightText: "book travel",
    cashbackAmount: "$24.12",
    productEmoji: "🏨",
    brandName: "Expedia",
    brandDetail: "4-night stay",
    brandIcon: "Ex",
    bgColorClass: "bg-[hsl(90_50%_85%)]",
    decoColor: "hsl(90, 50%, 78%)",
  },
  {
    highlightText: "eat out",
    cashbackAmount: "$5.85",
    productEmoji: "🍹",
    brandName: "Smyth Tavern",
    brandDetail: "Dinner and drinks",
    brandIcon: "ST",
    bgColorClass: "bg-[hsl(170_40%_82%)]",
    decoColor: "hsl(170, 40%, 75%)",
  },
  {
    highlightText: "shop in stores",
    cashbackAmount: "$29.99",
    productEmoji: "🪑",
    brandName: "IKEA",
    brandDetail: "SOTENÄS Armchair",
    brandIcon: "IK",
    bgColorClass: "bg-[hsl(210_40%_88%)]",
    decoColor: "hsl(210, 40%, 80%)",
  },
];

interface HeroCarouselProps {
  onJoinClick: () => void;
}

export default function HeroCarousel({ onJoinClick }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 600);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const slide = slides[current];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-tight tracking-tight">
            Earn Cash Back
            <br />
            when you{" "}
          </h1>
          <div className="mt-2 overflow-hidden h-[1.4em]" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
            <div
              key={current}
              className="font-bold text-foreground leading-tight tracking-tight"
            >
              <span
                className="relative inline-block bg-[#E0D7FF] px-4 py-1 rounded-2xl"
              >
                <SplitText
                  text={slide.highlightText}
                  delay={50}
                  duration={1}
                  ease="power3.out"
                />
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={onJoinClick}
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Join for Free
            </Button>
          </div>
        </div>

        <div className="flex-1 relative h-[400px] lg:h-[460px]">
          <div
            key={`bg-${current}`}
            className={`absolute top-0 right-0 w-[90%] h-full rounded-[2rem] ${slide.bgColorClass}`}
            style={{
              animation: "hero-bg-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
            }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
              <circle cx="320" cy="80" r="120" fill="none" stroke={slide.decoColor} strokeWidth="2" />
              <circle cx="100" cy="300" r="80" fill="none" stroke={slide.decoColor} strokeWidth="1.5" />
              <line x1="200" y1="0" x2="200" y2="400" stroke={slide.decoColor} strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          <div
            key={`card-${current}`}
            className="absolute left-0 lg:left-[5%] top-[15%] z-20 bg-background rounded-2xl shadow-2xl p-4 w-[160px]"
            style={{
              animation: "card-float-in 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center text-5xl mb-3">
              {slide.productEmoji}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {slide.brandIcon}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{slide.brandName}</p>
                <p className="text-xs text-muted-foreground">{slide.brandDetail}</p>
              </div>
            </div>
          </div>

          <div
            key={`badge-${current}`}
            className="absolute left-[15%] lg:left-[20%] top-[5%] z-30"
            style={{
              animation: "badge-pop 0.5s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
          >
            <div className="bg-background rounded-full px-4 py-2 shadow-lg border flex items-center gap-1.5">
              <span className="text-sm font-bold text-primary">{slide.cashbackAmount}</span>
              <span className="text-sm text-foreground">Cash Back</span>
            </div>
            <div className="w-3 h-3 bg-background border-b border-r rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow-sm" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t">
        {[
          { rating: "4.6", source: "Trustpilot", count: "37k reviews", icon: "⭐" },
          { rating: "4.8", source: "App Store", count: "361k ratings", icon: "📱" },
          { rating: "4.9", source: "Chrome Web Store", count: "43.6k ratings", icon: "🌐" },
        ].map((item) => (
          <div key={item.source} className="flex items-center gap-2">
            <span>{item.icon}</span>
            <span className="font-bold text-foreground">{item.rating}</span>
            <span className="text-star">★</span>
            <span className="font-medium text-foreground">{item.source}</span>
            <span className="text-primary text-sm">{item.count}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">Your Cash Back may vary.</p>
    </section>
  );
}