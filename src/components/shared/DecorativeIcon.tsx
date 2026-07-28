import React from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Link, type LinkProps } from 'react-router-dom';

export type DecorativeIconVariant = 'inline' | 'framed' | 'action';
export type DecorativeIconSize = 16 | 20 | 24;

interface DecorativeIconProps {
  icon: LucideIcon;
  variant?: DecorativeIconVariant;
  size?: DecorativeIconSize;
  className?: string;
}

export const DecorativeIcon: React.FC<DecorativeIconProps> = ({
  icon: Icon,
  variant = 'inline',
  size = 16,
  className = '',
}) => (
  <span
    className={`decorative-icon decorative-icon-${variant} decorative-icon-${size} ${className}`}
    aria-hidden="true"
  >
    <Icon size={size} strokeWidth={1.6} />
  </span>
);

interface ArchiveCtaLinkProps extends Omit<LinkProps, 'children'> {
  children: React.ReactNode;
  iconSize?: DecorativeIconSize;
  iconClassName?: string;
}

export const ArchiveCtaLink: React.FC<ArchiveCtaLinkProps> = ({
  children,
  className = '',
  iconSize = 16,
  iconClassName = '',
  ...props
}) => (
  <Link className={className} {...props}>
    <span>{children}</span>
    <DecorativeIcon
      icon={ArrowRight}
      variant="action"
      size={iconSize}
      className={iconClassName}
    />
  </Link>
);
