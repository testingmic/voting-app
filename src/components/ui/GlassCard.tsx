import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  noPadding = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white/10 dark:bg-gray-900/50 border-white/10 dark:border-gray-700/50',
    primary: 'bg-blue-50/10 dark:bg-blue-900/20 border-blue-100/20 dark:border-blue-700/30',
    success: 'bg-green-50/10 dark:bg-green-900/20 border-green-100/20 dark:border-green-700/30',
    warning: 'bg-orange-50/10 dark:bg-orange-900/20 border-orange-100/20 dark:border-orange-700/30'
  };

  return (
    <div
      className={cn(
        'backdrop-blur-xl backdrop-saturate-150 rounded-2xl border',
        'shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.05)]',
        'dark:bg-opacity-20 transition-all duration-300',
        !noPadding && 'p-6',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;

export const GlassCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('mb-6 dark:text-gray-100', className)}>
    {children}
  </div>
);

export const GlassCardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('dark:text-gray-300', className)}>
    {children}
  </div>
); 