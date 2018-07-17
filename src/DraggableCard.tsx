import React from 'react';
import Hammer from 'hammerjs';
import ReactDOM from 'react-dom';
import { SimpleCard } from './SimpleCard';
import { Direction } from './utils';
import {
  Position,
  CardOutActions,
  CardRenderProp,
  StyleTransformer,
} from './types';

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
  activatedDirection?: Direction;
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
      activatedDirection: undefined,
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
  getDirection() {
    const screen = this.props.containerSize;
    const card = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const THRESHOLD = 50

    switch (true) {
      case this.state.x < -THRESHOLD:
        return Direction.Left;
      case this.state.x + (card.offsetWidth - THRESHOLD) > screen.x:
        return Direction.Right;
      case this.state.y < -THRESHOLD:
        return Direction.Top;
      case this.state.y + (card.offsetHeight - THRESHOLD) > screen.y:
        return Direction.Bottom;
      default:
        return false;
    }
  };
  panstart() {
    const { x, y } = this.state;
    this.setState({
      animation: false,
      startPosition: { x, y },
      pristine: false,
    });
  }

  panend(ev: HammerInput) {
    const direction = this.getDirection();

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
    const direction = this.getDirection();
    this.setState({ activatedDirection: direction === false ? undefined : direction })

    this.setState(({ initialPosition: { x, y }}) => ({
      x: ev.deltaX + x,
      y: ev.deltaY + y,
      activatedDirection: direction || undefined
    }));
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
    const { x, y, animation, pristine, startPosition, activatedDirection } = this.state;
    const style = this.props.styleTransformer({ x, y }, startPosition);
    return (
      <SimpleCard
        {...this.props}
        style={style}
        shouldTransition={!!animation}
        isPristine={pristine}
        activatedDirection={activatedDirection}
      />
    );
  }
}
