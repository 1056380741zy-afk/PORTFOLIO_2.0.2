import React from 'react';

interface CardProps {
  depth?: number;
  className?: string;
  children: React.ReactNode;
  noBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ depth = 1, className = '', children, noBorder = false }, ref) => {
  // L1 - Page Base: #f7f6f3 (handled by body)
  // L2 - Primary Card (depth 1): #FFFFFF
  // L3 - Nested Card (depth 2): #f7f6f3
  // L4 - Deeply Nested (depth 3): #FFFFFF
  
  const bgColor = depth % 2 !== 0 ? 'bg-card-bg' : 'bg-base-bg';
  const borderColor = noBorder ? '' : 'border border-[#2d2d2d]/5'; // 1px solid rgba(45, 45, 45, 0.05) -> black/5 is close enough or I can define a custom color
  
  // Custom border color from config: border-black/5 is roughly rgba(0,0,0,0.05). 
  // The user asked for rgba(45, 45, 45, 0.05). 45 is ~17% of 255. So it's dark grey.
  // I'll use a custom class or inline style if needed, but Tailwind's border-black/5 is fine for "minimal".
  // Actually, I should use the `border` utility with an opacity modifier if I want exact.
  // Or just define it in the theme. I didn't define a specific border color in theme, but I can use `border-gray-900/5`.
  
  return (
    <div ref={ref} className={`${bgColor} ${borderColor} rounded-2xl ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
