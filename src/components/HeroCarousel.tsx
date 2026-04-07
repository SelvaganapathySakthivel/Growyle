import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Star, Apple, Chrome, ArrowRight, Zap, Target, Smartphone } from "lucide-react";
import SplitText from "./SplitText";
import heroHotel from "@/assets/hero-hotel.png";
import heroPool from "@/assets/hero-pool.png";
import heroElectronics from "@/assets/hero-electronics.png";
import heroFashion from "@/assets/hero-fashion.png";

interface HeroSlide {
  id: string;
  highlightText: string;
  cashbackAmount: string;
  mainImage: string;
  subImage?: string;
  brandName: string;
  brandDetail: string;
  brandIcon: React.ReactNode;
  bgColorClass: string;
  decoColor: string;
  accentColor: string;
  layout: "default" | "tech-glass" | "fashion-overlap";
}

const slides: HeroSlide[] = [
  {
    id: "travel",
    highlightText: "book travel",
    cashbackAmount: "$24.12",
    mainImage: heroHotel,
    subImage: heroPool,
    brandName: "Expedia",
    brandDetail: "4-night stay",
    brandIcon: <Target className="w-6 h-6" />,
    bgColorClass: "bg-primary/5",
    decoColor: "hsl(var(--primary))",
    accentColor: "hsl(var(--primary))",
    layout: "default",
  },
  {
    id: "tech",
    highlightText: "buy tech",
    cashbackAmount: "$15.50",
    mainImage: heroElectronics,
    brandName: "Best Buy",
    brandDetail: "Sleek Headphones",
    brandIcon: <Zap className="w-6 h-6" />,
    bgColorClass: "bg-accent/10",
    decoColor: "hsl(var(--accent))",
    accentColor: "hsl(var(--accent))",
    layout: "tech-glass",
  },
  {
    id: "fashion",
    highlightText: "shop fashion",
    cashbackAmount: "12% Back",
    mainImage: heroFashion,
    brandName: "Nike",
    brandDetail: "Luxury Sneakers",
    brandIcon: <Smartphone className="w-6 h-6" />,
    bgColorClass: "bg-primary/10",
    decoColor: "hsl(var(--primary))",
    accentColor: "hsl(var(--primary))",
    layout: "fashion-overlap",
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
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const slide = slides[current];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-24 overflow-hidden min-h-[700px] lg:min-h-[850px]">
      <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24 h-full relative">
        {/* Left Side: Dynamic Content */}
        <div className="flex-1 text-center lg:text-left z-10 w-full max-w-2xl mx-auto lg:mx-0">
          <div className="h-auto">
            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.8rem] font-black text-foreground leading-[1] tracking-tighter">
              Earn Cash Back <br className="hidden md:block" />
              when you <br className="hidden md:block" />
              <div className="relative inline-block mt-4 overflow-hidden h-[1.3em] align-bottom">
                 <div
                    key={current}
                    className="relative z-10 bg-primary/10 px-6 py-1 rounded-2xl md:rounded-3xl text-primary animate-hero-text-in"
                  >
                    <SplitText
                      text={slide.highlightText}
                      delay={40}
                      duration={0.8}
                      className="font-black"
                    />
                  </div>
              </div>
            </h1>
          </div>
          
          <div className="mt-12 lg:mt-16 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-8">
            <Button
              onClick={onJoinClick}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl font-black shadow-[0_20px_40px_-10px_rgba(var(--primary),0.4)] hover:shadow-2xl hover:translate-y-[-2px] transition-all h-auto active:scale-95 group"
            >
              Join for Free
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex -space-x-3">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                 </div>
               ))}
               <div className="pl-4 text-sm font-bold text-muted-foreground self-center">
                 Join 17M+ members
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Masterpiece */}
        <div className="flex-1 relative w-full lg:h-[650px] mt-16 lg:mt-0 perspective-[1000px]">
          {/* Dynamic Background Decoration */}
          <div 
            key={`bg-${current}`}
            className={`absolute right-[-5%] top-[5%] w-[90%] h-[95%] z-0 rounded-[4rem] overflow-hidden ${slide.bgColorClass} transition-all duration-1000 ease-in-out`}
            style={{
              clipPath: "polygon(0 15%, 85% 0, 100% 85%, 15% 100%)",
              animation: "hero-bg-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            <div className="absolute inset-0 opacity-20">
               <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke={slide.decoColor} strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
               </svg>
            </div>
          </div>

          {/* Slide Layouts */}
          {slide.layout === "tech-glass" ? (
             /* Unique Tech Layout: Immersive Glassmorphism */
             <div key={`layout-${current}`} className="relative z-10 w-full h-full flex items-center justify-center animate-fade-in">
                <div className="relative w-[90%] aspect-square lg:aspect-auto lg:h-[80%] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 group">
                   <img src={slide.mainImage} alt={slide.brandName} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                   
                   {/* Large Glass Card Offset */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] bg-white/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/30 p-8 shadow-2xl animate-card-float-in">
                      <div className="flex items-center gap-6 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                           {slide.brandIcon}
                        </div>
                        <div>
                           <p className="text-2xl font-black text-white leading-none">{slide.brandName}</p>
                           <p className="text-sm font-bold text-white/70 uppercase tracking-widest mt-1">Premium Electronics</p>
                        </div>
                      </div>
                      <p className="text-white font-medium text-lg mb-6">Upgrade your setup with exclusive rewards on top-tier tech gadgets.</p>
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                         <span className="text-white/80 font-bold uppercase text-xs tracking-widest">Instant Reward</span>
                         <span className="text-2xl font-black text-accent">{slide.cashbackAmount}</span>
                      </div>
                   </div>
                </div>
             </div>
          ) : (
             /* Default & Fashion Layout */
             <div key={`layout-${current}`} className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-8">
                <div className="w-[85%] lg:w-[85%] aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white animate-hero-bg-in">
                   <img src={slide.mainImage} alt={slide.brandName} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Floating Card Detail */}
                <div className="absolute -bottom-10 -left-6 md:-left-12 lg:-left-24 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] p-8 w-[300px] lg:w-[350px] animate-card-float-in border border-border/10">
                   {slide.subImage && (
                     <div className="aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6 shadow-inner border border-border/5">
                       <img src={slide.subImage} alt="Brand" className="w-full h-full object-cover" />
                     </div>
                   )}
                   
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/5">
                        {slide.brandIcon}
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-foreground text-xl leading-none mb-2">{slide.brandName}</p>
                        <p className="text-sm text-muted-foreground font-black uppercase tracking-[0.1em]">{slide.brandDetail}</p>
                      </div>
                   </div>

                   {/* Cashback Badge */}
                   <div className="absolute -top-8 right-8 bg-accent rounded-3xl px-8 py-4 shadow-[0_20px_40px_-5px_rgba(var(--accent),0.4)] border-2 border-white/20 flex flex-col items-center animate-badge-pop">
                      <span className="text-2xl font-black text-white tracking-tight">{slide.cashbackAmount}</span>
                      <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em] leading-none mt-1">Cash Back</span>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-accent rotate-45 -z-10" />
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Modern Trust Indicators */}
      <div className="mt-32 pt-20 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="flex flex-col items-center gap-3 group transition-all hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00B67A] text-white shadow-xl shadow-green-500/20 rotate-[-4deg] group-hover:rotate-0 transition-transform">
             <Star className="w-8 h-8 fill-current" />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black tracking-tight">4.6/5</span>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Trustpilot</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 group transition-all hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white shadow-xl shadow-black/20 rotate-[5deg] group-hover:rotate-0 transition-transform">
             <Apple className="w-8 h-8 fill-current" />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black tracking-tight">4.8/5</span>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">App Store</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 group transition-all hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 rounded-[2rem] border-2 border-border/50 bg-white shadow-xl group-hover:shadow-orange-500/10 transition-all">
             <Chrome className="w-8 h-8 text-orange-500 fill-current" />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black tracking-tight">4.9/5</span>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Web Store</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 group transition-all hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 rotate-[-6deg] group-hover:rotate-0 transition-transform">
             <div className="font-black text-xl italic">Grow!</div>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black tracking-tight">3,500+</span>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Live Brands</span>
          </div>
        </div>
      </div>
    </section>
  );
}