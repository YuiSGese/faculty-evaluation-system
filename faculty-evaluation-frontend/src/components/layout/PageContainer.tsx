'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className,
}) => {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddings = {
    none: '',
    sm: 'px-4 py-4',
    md: 'px-6 py-6',
    lg: 'px-8 py-8',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidths[maxWidth],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

PageContainer.displayName = 'PageContainer';

export { PageContainer };
