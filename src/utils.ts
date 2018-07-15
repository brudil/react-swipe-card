import { Position } from './types';

export const translate3d = (pos: Position, initialPos: Position) => {
  const rotate = (initialPos.x !== 0 || initialPos.y !== 0) ? `rotate(${(initialPos.x - pos.x) * 0.1 * -1}deg)` : '';
  const translate3d = `translate3d(${pos.x}px, ${pos.y}px, 0px)`
  const translate = `${translate3d} ${rotate}`;
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate,
    opacity: (initialPos.x !== 0 || initialPos.y !== 0) ? 1 - Math.abs(initialPos.x - pos.x) / 300 : 1
  };
};

export enum Direction {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}
