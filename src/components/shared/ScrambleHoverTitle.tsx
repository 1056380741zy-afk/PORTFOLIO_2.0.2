import React, { useEffect, useRef } from 'react';

type ScrambleGlyph = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

class TextScramble {
  private readonly el: HTMLElement;
  private readonly chars = '!<>-_\\/[]{}—=+*^?#010101X';
  private queue: ScrambleGlyph[] = [];
  private frameRequest = 0;
  private frame = 0;
  private resolve: () => void = () => undefined;

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    this.queue = Array.from({ length }, (_, index) => {
      const start = Math.floor(Math.random() * 40);
      return {
        from: oldText[index] || '',
        to: newText[index] || '',
        start,
        end: start + Math.floor(Math.random() * 40),
      };
    });

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  cancel() {
    cancelAnimationFrame(this.frameRequest);
  }

  private update() {
    let output = '';
    let complete = 0;

    this.queue.forEach((glyph) => {
      if (this.frame >= glyph.end) {
        complete += 1;
        output += glyph.to;
      } else if (this.frame >= glyph.start) {
        if (!glyph.char || Math.random() < 0.28) {
          glyph.char = this.randomChar();
        }
        output += `<span class="scramble-glyph">${glyph.char}</span>`;
      } else {
        output += glyph.from;
      }
    });

    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
      return;
    }

    this.frameRequest = requestAnimationFrame(this.update);
    this.frame += 1;
  }

  private randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

interface ScrambleHoverTitleProps {
  text: string;
  className?: string;
  animateOnView?: boolean;
  as?: 'h2' | 'h3';
}

export const ScrambleHoverTitle: React.FC<ScrambleHoverTitleProps> = ({
  text,
  className = '',
  animateOnView = true,
  as: Heading = 'h3',
}) => {
  const elRef = useRef<HTMLHeadingElement>(null);
  const fxRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    const element = elRef.current;
    if (!element) return undefined;

    fxRef.current ??= new TextScramble(element);
    element.innerText = text;

    if (!animateOnView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => fxRef.current?.cancel();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fxRef.current?.setText(text);
        observer.unobserve(entry.target);
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      fxRef.current?.cancel();
    };
  }, [animateOnView, text]);

  const handleMouseEnter = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fxRef.current?.setText(text);
    }
  };

  return (
    <Heading ref={elRef} className={`${className} cursor-crosshair`} onMouseEnter={handleMouseEnter}>
      {text}
    </Heading>
  );
};
