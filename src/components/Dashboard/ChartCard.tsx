import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold gradient-text section-gradient-dashboard mb-6">
        {title}
      </h3>
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-950/50 rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;