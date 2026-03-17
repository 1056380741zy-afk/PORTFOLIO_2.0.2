import React, { useRef, useEffect } from 'react';

// 原生 JS 核心类
class TextScramble {
  el: HTMLElement;
  chars: string;
  resolve!: () => void;
  queue: any[];
  frameRequest!: number;
  frame: number;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#010101X';
    this.queue = [];
    this.frame = 0;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="text-[#7e4ba6] opacity-80">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

interface ScrambleHoverTitleProps {
  text: string;
  className?: string;
}

export const ScrambleHoverTitle: React.FC<ScrambleHoverTitleProps> = ({ text, className }) => {
  const elRef = useRef<HTMLHeadingElement>(null);
  const fxRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    if (elRef.current) {
      // 初始化 TextScramble 实例
      if (!fxRef.current) {
        fxRef.current = new TextScramble(elRef.current);
        elRef.current.innerText = text; // 设置初始占位文字
      }

      // 设置交叉观察器
      const observer = new IntersectionObserver(
        ([entry]) => {
          // 当标题进入视口时 (isIntersecting 为 true)
          if (entry.isIntersecting) {
            fxRef.current?.setText(text); // 触发乱码动画
            observer.unobserve(entry.target); // 触发一次后取消观察，防止上下滚动反复触发
          }
        },
        { threshold: 0.2 } // 露出 20% 时触发
      );

      observer.observe(elRef.current);

      // 清理函数
      return () => observer.disconnect();
    }
  }, [text]); // 当 text 改变（轮播图切换）时，重新执行检测和动画

  const handleMouseEnter = () => {
    if (fxRef.current) {
      fxRef.current.setText(text);
    }
  };

  return (
    <h3
      ref={elRef}
      className={`${className} cursor-crosshair`}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </h3>
  );
};
