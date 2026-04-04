import { Button } from "@/components/ui/button";
import { Star, Apple, Chrome } from "lucide-react";
import heroHotel from "@/assets/hero-hotel.png";
import heroPool from "@/assets/hero-pool.png";

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
        {/* Left Side: Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-bold text-foreground leading-[1.1] tracking-tight">
            Earn Cash Back <br className="hidden md:block" />
            when you <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-[#E0D7FF] px-4 py-1 rounded-2xl md:rounded-3xl text-[#5D3FD3]">
                book travel
              </span>
            </span>
          </h1>
          
          <div className="mt-10 lg:mt-12 flex justify-center lg:justify-start">
            <Button
              onClick={onJoinClick}
              size="lg"
              className="rounded-full bg-[#7B3FE4] hover:bg-[#6832C3] text-white px-12 py-7 text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl transition-all h-auto"
            >
              Join for Free
            </Button>
          </div>
        </div>

        {/* Right Side: Visual Stack */}
        <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none aspect-[4/3] md:aspect-square lg:aspect-auto h-[400px] md:h-[550px] lg:h-[600px]">
          {/* Background Wavy Decoration */}
          <div className="absolute right-[-10%] top-[10%] w-[80%] h-[80%] z-0 rotate-[-5deg]">
            <div className="w-full h-full bg-[#E1FFB1] rounded-[3rem] opacity-60 overflow-hidden">
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 20 Q 25 10, 50 20 T 100 20 V 100 H 0 Z" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
                 <path d="M0 30 Q 25 20, 50 30 T 100 30 V 100 H 0 Z" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
                 <path d="M0 40 Q 25 30, 50 40 T 100 40 V 100 H 0 Z" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
                 <path d="M0 50 Q 25 40, 50 50 T 100 50 V 100 H 0 Z" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Main Image: Hotel Door */}
          <div className="absolute right-0 top-0 w-[85%] h-[90%] z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20">
            <img 
              src={heroHotel} 
              alt="Luxury Hotel Room Door" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Card: Expedia Pool */}
          <div className="absolute left-[-5%] bottom-[15%] md:left-0 md:bottom-[20%] w-[55%] md:w-[45%] z-20 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 md:p-6 animate-fade-in-up">
            {/* Cashback Badge */}
            <div className="absolute -top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg border border-border flex items-center gap-1.5 z-30 transform hover:scale-105 transition-transform cursor-default">
              <span className="text-sm font-black text-[#7B3FE4]">$24.12</span>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Cash Back</span>
              {/* Tooltip triangle */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-border rotate-45" />
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-inner">
              <img 
                src={heroPool} 
                alt="Luxury Resort Pool" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white bg-[#00355F] rounded p-1" fill="none" stroke="currentColor" strokeWidth="3">
                   <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-foreground text-sm tracking-tight leading-none mb-1">Expedia</p>
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">4-night stay</p>
              </div>
            </div>
          </div>
          
          <p className="absolute bottom-[-20px] right-0 text-[10px] text-muted-foreground font-medium opacity-60">Your Cash Back may vary.</p>
        </div>
      </div>

      {/* Trust Indicators Footer */}
      <div className="mt-24 lg:mt-32 pt-10 border-t border-border/50 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="flex items-center justify-center w-6 h-6 rounded-sm bg-[#00B67A] text-white">
             <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-1.5 font-bold text-foreground tracking-tight">
            <span className="text-lg">4.6</span>
            <span className="text-[#00B67A]">★</span>
            <span className="text-base">Trustpilot</span>
            <span className="text-muted-foreground font-medium text-sm ml-1">37k reviews</span>
          </div>
        </div>

        <div className="flex items-center gap-2 group cursor-default">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-black text-white">
             <Apple className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-1.5 font-bold text-foreground tracking-tight">
            <span className="text-lg">4.8</span>
            <span className="text-black">★</span>
            <span className="text-base">App Store</span>
            <span className="text-muted-foreground font-medium text-sm ml-1">361k ratings</span>
          </div>
        </div>

        <div className="flex items-center gap-2 group cursor-default">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-border">
             <Chrome className="w-4 h-4 text-orange-500 fill-current" />
          </div>
          <div className="flex items-center gap-1.5 font-bold text-foreground tracking-tight">
            <span className="text-lg">4.9</span>
            <span className="text-orange-500">★</span>
            <span className="text-base">Chrome Web Store</span>
            <span className="text-muted-foreground font-medium text-sm ml-1">43.6k ratings</span>
          </div>
        </div>
      </div>
    </section>
  );
}
