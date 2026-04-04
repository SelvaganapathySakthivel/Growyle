interface GlassBrandCardProps {
  name: string;
  logo: string;
  cashback: string;
  bgColor?: string;
  textColor?: string;
}

export default function GlassBrandCard({ name, logo, cashback, bgColor = "#ffffff", textColor = "#1a1a2e" }: GlassBrandCardProps) {
  return (
    <div className="group cursor-pointer flex flex-col items-center gap-1.5">
      <div 
        className="relative w-[140px] h-[70px] rounded-[14px] overflow-hidden isolate transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex items-center justify-center p-3"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300
          bg-[linear-gradient(135deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.2)_100%)]" />
        <img
          src={logo}
          alt={name}
          className="relative z-20 max-h-[40px] max-w-[110px] object-contain"
          loading="lazy"
          onError={(e: any) => {
            e.target.onerror = null;
            const parent = e.target.parentElement;
            if (parent) {
              const span = document.createElement('span');
              span.textContent = name;
              span.style.color = textColor;
              span.style.fontWeight = '700';
              span.style.fontSize = '16px';
              span.style.letterSpacing = '-0.02em';
              span.style.position = 'relative';
              span.style.zIndex = '20';
              e.target.replaceWith(span);
            }
          }}
        />
      </div>
      <p className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
        {cashback} Cash Back
      </p>
    </div>
  );
}