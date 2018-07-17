import React, { createElement } from 'react';

import { SimpleCard, SimpleCardProps } from './SimpleCard';
import { DraggableCard, DraggableCardProps } from './DraggableCard';
import { StyleTransformer } from './types';

interface Props {
  active?: boolean;
  styleTransformer: StyleTransformer;
}

type CardPassthroughProps = Props & SimpleCardProps & DraggableCardProps;

export const CardPassthrough: React.SFC<CardPassthroughProps> = ({
  active = false,
  ...props
}) => {
  return active
    ? createElement(DraggableCard, props as DraggableCardProps)
    : createElement(SimpleCard, props as SimpleCardProps);
};
