import React from 'react';

interface CardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, className = '', children }) => {
  const id = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <section className={`card ${className}`} aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
};

export default Card;
