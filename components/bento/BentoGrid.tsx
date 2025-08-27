
import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default BentoGrid;
