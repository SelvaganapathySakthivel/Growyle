'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 10 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'left',
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(() => {
    if (!isVisible || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');
    
    gsap.fromTo(
      elements,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (showCallback && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        },
      }
    );
  }, { scope: containerRef, dependencies: [isVisible] });

  const renderText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className="split-item inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ));
    }
    
    if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} className="split-item inline-block mr-[0.5em]">
          {word}
        </span>
      ));
    }

    return <span className="split-item inline-block">{text}</span>;
  };

  return (
    <div
      ref={containerRef}
      className={`split-text-container ${className}`}
      style={{ textAlign, display: 'inline-block' }}
    >
      {renderText()}
    </div>
  );
}