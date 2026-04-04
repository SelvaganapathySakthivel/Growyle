import React, { useId } from 'react';

interface ReflectiveCardProps { className?: string; style?: React.CSSProperties; children?: React.ReactNode; }

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({ className = '', style = {}, children }) => {
  const filterId = useId().replace(/:/g, '-');
  return (
    <div className={`relative rounded-[20px] overflow-hidden bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] isolate font-sans ${className}`} style={style}>
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id={`metallic-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feSpecularLighting in="noiseAlpha" surfaceScale="20" specularConstant="5" specularExponent="20" lightingColor="#ffffff" result="light">
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] z-0" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.8%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url(%23noiseFilter)%27%2F%3E%3C%2Fsvg%3E')] mix-blend-overlay opacity-[0.15]" />
      <div className="absolute inset-0 z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_60%,rgba(255,255,255,0.08)_100%)] pointer-events-none" />
      <div className="absolute inset-0 rounded-[20px] p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.2)_100%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] z-20 pointer-events-none" />
      <div className="relative z-30 h-full w-full">{children}</div>
    </div>
  );
};

export default ReflectiveCard;