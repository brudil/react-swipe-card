import React, { createElement } from 'react';

import { SimpleCard, SimpleCardProps } from './SimpleCard';
import { DraggableCard, DraggableCardProps } from './DraggableCard';

interface Props {
  active?: boolean;
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
