import React from 'react';
import { CardRenderProp } from './types';

export interface CardProps {
  id: number;
  className?: string;
  onSwipeLeft?(): void;
  onSwipeRight?(): void;
  onSwipeBottom?(): void;
  onSwipeTop?(): void;
  render: CardRenderProp;
}

export const Card: React.SFC<CardProps> = () => null;
