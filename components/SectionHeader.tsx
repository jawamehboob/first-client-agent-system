import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, description }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
      <span className="text-orange-600">{number}</span> {title}
    </h3>
    <p className="mt-2 text-stone-600 max-w-2xl">
      {description}
    </p>
  </div>
);

export default SectionHeader;
