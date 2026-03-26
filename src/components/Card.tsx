import React from 'react';

interface CardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, className = '', children }) => {
  return (
    <div className={`card ${className}`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
