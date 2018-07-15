import React from 'react';

export interface CardProps {
  className?: string;
  onSwipeLeft?(): void;
  onSwipeRight?(): void;
  onSwipeBottom?(): void;
  onSwipeTop?(): void;

}

export const Card: React.SFC<CardProps> = () => null;
