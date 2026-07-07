import React from 'react';

type BoardBackgroundProps = {
  layout?: 'default' | 'archive';
};

export const BoardBackground: React.FC<BoardBackgroundProps> = ({ layout = 'default' }) => {
  const backgroundSize = layout === 'archive' ? '60% auto' : '100% auto';

  if (layout === 'archive') {
    return (
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden rounded-[28px]">
        <div
          className="absolute inset-0 z-0 opacity-[0.74]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,45,45,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,45,45,0.08) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            backgroundPosition: '0 0',
          }}
        />
        <div
          className="absolute inset-0 z-[3] opacity-[0.68]"
          style={{
            backgroundImage: "url('/bg/background.png?v=20260707')",
            backgroundSize: '82% auto',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          className="absolute right-[13%] top-[12%] z-10 h-[34%] w-[25%] opacity-[0.13]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(126,137,102,0.54) 0 1px, transparent 1.2px)',
            backgroundSize: '10px 10px',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 0%, #000 30%, transparent 68%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, #000 0%, #000 30%, transparent 68%)',
          }}
        />
        <div
          className="absolute left-[25%] top-[58%] z-10 h-[24%] w-[22%] opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(242,182,66,0.55) 0 1px, transparent 1.15px)',
            backgroundSize: '9px 9px',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 0%, #000 28%, transparent 64%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, #000 0%, #000 28%, transparent 64%)',
          }}
        />
        <div className="absolute left-[30%] right-[8%] top-[22%] z-20 h-px bg-[#2d2d2d]/8" />
        <div className="absolute left-[29%] right-[14%] bottom-[18%] z-20 h-px bg-[#2d2d2d]/7" />
        <div className="absolute right-4 top-3 z-30 font-mono text-[9px] tracking-[0.22em] text-text-dark/32">
          00:00:00
        </div>
        <div className="absolute right-4 top-12 z-30 font-mono text-[9px] tracking-[0.22em] text-text-dark/30">
          00:01:28
        </div>
        <div className="absolute right-4 top-[46%] z-30 font-mono text-[9px] tracking-[0.22em] text-text-dark/28">
          N 31.23
        </div>
        <div className="absolute right-4 top-[61%] z-30 font-mono text-[9px] tracking-[0.22em] text-text-dark/28">
          E 121.47
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,45,45,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,45,45,0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0',
        }}
      />
      <div
        className="absolute inset-0 z-[5] opacity-100"
        style={{
          backgroundImage: "url('/bg/background.png?v=20260707')",
          backgroundSize,
          backgroundPosition: 'center calc(50% + 5px)',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 z-[6] bg-transparent" />
      <div
        className="absolute inset-0 z-10 opacity-[0.19]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.18) 0.65px, transparent 0)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0',
        }}
      />
      <div
        className="absolute inset-0 z-10 opacity-[0.17]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.16) 0.6px, transparent 0)',
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0',
          WebkitMaskImage: 'radial-gradient(circle at 54% 52%, #000 0%, #000 30%, transparent 58%)',
          maskImage: 'radial-gradient(circle at 54% 52%, #000 0%, #000 30%, transparent 58%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 opacity-[0.14]"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 54% 52%, rgba(45,45,45,0.12) 0 1px, transparent 1px)',
            'radial-gradient(circle at 54% 52%, transparent 0 118px, rgba(45,45,45,0.16) 118px 119px, transparent 119px 172px, rgba(45,45,45,0.12) 172px 173px, transparent 173px 232px, rgba(45,45,45,0.08) 232px 233px, transparent 233px)',
            'radial-gradient(circle at 54% 52%, rgba(255,255,255,0.5), rgba(247,246,243,0) 62%)',
          ].join(', '),
          backgroundSize: ['10px 10px', '100% 100%', '100% 100%'].join(', '),
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      />
      <div
        className="absolute right-[8%] top-[12%] z-10 h-[48%] w-[28%] opacity-[0.13]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(126,137,102,0.46) 0 1px, transparent 1.15px)',
          backgroundSize: '9px 9px',
          WebkitMaskImage: 'radial-gradient(ellipse at 52% 48%, #000 0%, #000 28%, transparent 64%)',
          maskImage: 'radial-gradient(ellipse at 52% 48%, #000 0%, #000 28%, transparent 64%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute left-[28%] top-[38%] z-10 h-[30%] w-[22%] opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(245,176,2,0.46) 0 1px, transparent 1.15px)',
          backgroundSize: '8px 8px',
          WebkitMaskImage: 'radial-gradient(ellipse at 48% 52%, #000 0%, #000 26%, transparent 62%)',
          maskImage: 'radial-gradient(ellipse at 48% 52%, #000 0%, #000 26%, transparent 62%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div className="absolute left-0 right-0 top-[70%] z-20 h-px bg-[#2d2d2d]/10" />
      <div
        className="absolute left-7 bottom-10 z-20 h-px w-[140px] opacity-60"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(45,45,45,0.18) 0 18px, transparent 18px 30px)',
        }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 z-20 w-24 opacity-70"
        style={{
          backgroundImage: [
            'linear-gradient(to bottom, transparent 0, transparent 100%)',
            'repeating-linear-gradient(to bottom, rgba(45,45,45,0.16) 0 1px, transparent 1px 34px)',
          ].join(', '),
          backgroundSize: '100% 100%, 54px 100%',
          backgroundPosition: '0 0, right 10px top 0',
          backgroundRepeat: 'no-repeat, repeat',
        }}
      />
      <div className="absolute right-2 top-3 z-30 text-[9px] font-mono text-text-dark/40 tracking-[0.22em]">
        00:00:00
      </div>
      <div className="absolute right-2 top-12 z-30 text-[9px] font-mono text-text-dark/40 tracking-[0.22em]">
        00:01:28
      </div>
      <div className="absolute right-2 top-[44%] z-30 text-[9px] font-mono text-text-dark/35 tracking-[0.22em]">
        N 31.23
      </div>
      <div className="absolute right-2 top-[60%] z-30 text-[9px] font-mono text-text-dark/35 tracking-[0.22em]">
        E 121.47
      </div>
    </div>
  );
};
