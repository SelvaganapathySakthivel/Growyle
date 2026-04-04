import React, { useRef, useState } from 'react';

interface Position { x: number; y: number; }

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => { if (!divRef.current || isFocused) return; const rect = divRef.current.getBoundingClientRect(); setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); };
  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onFocus={() => { setIsFocused(true); setOpacity(0.6); }} onBlur={() => { setIsFocused(false); setOpacity(0); }} onMouseEnter={() => setOpacity(0.6)} onMouseLeave={() => setOpacity(0)} className={`relative overflow-hidden w-full h-full ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out z-10" style={{ opacity, background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)` }} />
      {children}
    </div>
  );
};

export default SpotlightCard;