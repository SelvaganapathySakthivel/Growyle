import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface Brand {
  name: string;
  cashback: string;
  logo: string;
  bgColor: string;
  textColor: string;
}

interface FallingBrandsProps {
  brands: Brand[];
}

const FallingBrands: React.FC<FallingBrandsProps> = ({ brands }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create());
  const bodiesRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([]);
  const requestRef = useRef<number>();
  const [activeBrands, setActiveBrands] = useState<{ id: number; brand: Brand }[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    const engine = engineRef.current;
    engine.gravity.y = 0.8;

    // Boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Mouse constraint for interaction
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Sync loop
    const update = () => {
      Matter.Engine.update(engine, 1000 / 60);

      bodiesRef.current.forEach(({ body, element }) => {
        if (element) {
          element.style.transform = `translate(${body.position.x - 75}px, ${body.position.y - 40}px) rotate(${body.angle}rad)`;
          element.style.opacity = '1';
        }
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    // Initial spawn
    const initialCount = Math.min(brands.length, 30);
    const initialBrands = [];
    for (let i = 0; i < initialCount; i++) {
      initialBrands.push({ id: nextIdRef.current++, brand: brands[i] });
    }
    setActiveBrands(initialBrands);

    // Continuous spawning logic for the rest
    let currentIdx = initialCount;
    const spawnBrand = () => {
      if (bodiesRef.current.length >= 50 || currentIdx >= brands.length) return;

      const brand = brands[currentIdx++];
      const id = nextIdRef.current++;
      
      setActiveBrands((prev) => [...prev, { id, brand }]);
    };

    const spawnInterval = setInterval(spawnBrand, 1000 + Math.random() * 1000);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(spawnInterval);
      Matter.Engine.clear(engine);
    };
  }, [brands]);

  // Handle active brands by creating their bodies
  useEffect(() => {
    if (!containerRef.current) return;
    const engine = engineRef.current;
    
    activeBrands.forEach(({ id }) => {
      const label = `brand-${id}`;
      // Only create if it doesn't exist in the world yet
      if (!Matter.Composite.allBodies(engine.world).find(b => b.label === label)) {
        const width = containerRef.current!.clientWidth;
        const x = Math.random() * width;
        const y = -100 - Math.random() * 1000; // Scatter vertically above the viewport

        const body = Matter.Bodies.rectangle(x, y, 150, 80, {
          restitution: 0.6,
          friction: 0.1,
          label: label,
          angle: (Math.random() - 0.5) * 0.5,
        });

        Matter.Composite.add(engine.world, body);
      }
    });
  }, [activeBrands]);

  const setRef = (id: number, el: HTMLDivElement | null, bodyLabel: string) => {
    if (el) {
      const body = Matter.Composite.allBodies(engineRef.current.world).find(b => b.label === bodyLabel);
      if (body && !bodiesRef.current.find(b => b.body === body)) {
        bodiesRef.current.push({ body, element: el });
      }
    } else {
      // Cleanup ref if element unmounts
      bodiesRef.current = bodiesRef.current.filter(b => b.body.label !== bodyLabel);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden bg-transparent select-none p-8"
      style={{ touchAction: "none" }}
    >
      {activeBrands.map(({ id, brand }) => (
        <div
          key={id}
          ref={(el) => setRef(id, el, `brand-${id}`)}
          className="brand-card absolute w-[150px] h-[80px] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 shadow-lg border border-white/20 backdrop-blur-sm transition-shadow hover:shadow-2xl cursor-grab active:cursor-grabbing animate-in fade-in zoom-in duration-500 opacity-0"
          style={{
            backgroundColor: brand.bgColor,
            color: brand.textColor,
            left: 0,
            top: 0,
            willChange: "transform",
          }}
        >
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1"
          />
          <span className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
            {brand.name}
          </span>
          <span className="text-[10px] font-medium opacity-80">
            {brand.cashback}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FallingBrands;
