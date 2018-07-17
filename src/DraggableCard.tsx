import React from 'react';
import Hammer from 'hammerjs';
import ReactDOM from 'react-dom';
import { SimpleCard } from './SimpleCard';
import { Direction } from './utils';
import { Position, CardOutActions, CardRenderProp, StyleTransformer } from './types';

export interface DraggableCardProps extends CardOutActions {
  index: number;
  containerSize: Position;

  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeBottom?: () => void;
  onSwipeTop?: () => void;

  styleTransformer: StyleTransformer;
  render: CardRenderProp;
}

interface DraggableCardState {
  x: number;
  y: number;
  initialPosition: Position;
  startPosition: Position;
  animation: null | boolean;
  pristine: boolean;
}

export class DraggableCard extends React.Component<
  DraggableCardProps,
  DraggableCardState
> {
  private hammer: HammerManager | null = null;

  constructor(props: DraggableCardProps) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true,
    };
    this.resetPosition = this.resetPosition.bind(this);
    this.handlePan = this.handlePan.bind(this);
  }

  resetPosition() {
    const { x, y } = this.props.containerSize;
    const card = ReactDOM.findDOMNode(this) as HTMLDivElement;

    const initialPosition = {
      x: Math.round((x - card.offsetWidth) / 2),
      y: Math.round((y - card.offsetHeight) / 2),
    };

    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: { x: 0, y: 0 },
    });
  }

  panstart() {
    const { x, y } = this.state;
    this.setState({
      animation: false,
      startPosition: { x, y },
      pristine: false,
    });
  }

  panend(ev: HammerInput) {
    const screen = this.props.containerSize;
    const card = ReactDOM.findDOMNode(this) as HTMLDivElement;

    const getDirection = () => {
      switch (true) {
        case this.state.x < -50:
          return Direction.Left;
        case this.state.x + (card.offsetWidth - 50) > screen.x:
          return Direction.Right;
        case this.state.y < -50:
          return Direction.Top;
        case this.state.y + (card.offsetHeight - 50) > screen.y:
          return Direction.Bottom;
        default:
          return false;
      }
    };

    const direction = getDirection();
    console.log('direction via', direction);

    const {
      index,

      onSwipeRight,
      onSwipeLeft,
      onSwipeBottom,
      onSwipeTop,

      onOutScreenRight,
      onOutScreenLeft,
      onOutScreenBottom,
      onOutScreenTop,
    } = this.props;

    switch (direction) {
      case Direction.Right: {
        if (onSwipeRight) {
          onSwipeRight();
          onOutScreenRight(index);
          break;
        }
      }
      case Direction.Left: {
        if (onSwipeLeft) {
          onSwipeLeft();
          onOutScreenLeft(index);
          break;
        }
      }
      case Direction.Top: {
        if (onSwipeTop) {
          onSwipeTop();
          onOutScreenTop(index);
          break;
        }
      }
      case Direction.Bottom: {
        if (onSwipeBottom) {
          onSwipeBottom();
          onOutScreenBottom(index);
          break;
        }
      }
      default: {
        this.resetPosition();
        this.setState({ animation: true });
        break;
      }
    }
  }

  panmove(ev: HammerInput) {
    this.setState(this.calculatePosition(ev.deltaX, ev.deltaY));
  }

  pancancel(ev: HammerInput) {
    console.log(ev.type);
  }

  handlePan(ev: HammerInput) {
    ev.preventDefault();
    this[ev.type](ev);
    return false;
  }

  handleSwipe(ev: HammerInput) {
    console.log(ev.type);
  }

  calculatePosition(deltaX: number, deltaY: number) {
    const {
      initialPosition: { x, y },
    } = this.state;
    return {
      x: x + deltaX,
      y: y + deltaY,
    };
  }

  componentDidMount() {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(
      this,
    ) as HTMLDivElement);
    this.hammer.add(new Hammer.Pan({ threshold: 2 }));

    this.hammer.on('panstart panend pancancel panmove', this.handlePan);
    this.hammer.on(
      'swipestart swipeend swipecancel swipemove',
      this.handleSwipe,
    );

    this.resetPosition();
    window.addEventListener('resize', this.resetPosition);
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop(false);
      this.hammer.destroy();
      this.hammer = null;
    }
    window.removeEventListener('resize', this.resetPosition);
  }

  render() {
    const { x, y, animation, pristine, startPosition } = this.state;
    const style = this.props.styleTransformer({ x, y }, startPosition);
    return (
      <SimpleCard
        {...this.props}
        style={style}
        shouldTransition={!!animation}
        isPristine={pristine}
      />
    );
  }
}
