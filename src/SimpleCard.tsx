import React from 'react';
import ReactDOM from 'react-dom';
import { Position, CardRenderProp, StyleTransformer } from './types';
import { Direction } from './utils';

export interface SimpleCardProps {
  containerSize: Position;
  className?: string;
  index: number;
  style?: React.CSSProperties;
  render: CardRenderProp;
  styleTransformer: StyleTransformer;
  shouldTransition?: boolean;
  isPristine?: boolean;
  activatedDirection?: Direction
}

interface SimpleCardState {
  initialPosition: Position;
}

export class SimpleCard extends React.Component<
  SimpleCardProps,
  SimpleCardState
> {
  constructor(props: SimpleCardProps) {
    super(props);
    this.state = { initialPosition: { x: 0, y: 0 } };
    this.setInitialPosition = this.setInitialPosition.bind(this);
  }

  setInitialPosition() {
    const card = ReactDOM.findDOMNode(this) as HTMLDivElement;
    console.log(this.props.containerSize);
    const initialPosition = {
      x: Math.round((this.props.containerSize.x - card.offsetWidth) / 2),
      y: Math.round((this.props.containerSize.y - card.offsetHeight) / 2),
    };
    this.setState({ initialPosition });
  }

  componentDidMount() {
    this.setInitialPosition();
    window.addEventListener('resize', this.setInitialPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition);
  }

  render() {
    const { initialPosition } = this.state;
    const { styleTransformer, shouldTransition, isPristine } = this.props;
    var style = {
      ...styleTransformer(initialPosition, initialPosition),
      zIndex: 10 - this.props.index,
      ...this.props.style,
    };

    return this.props.render({
      style,
      shouldTransition: shouldTransition ? true : false,
      activatedDirection: this.props.activatedDirection,
      isPristine:
        isPristine === undefined || isPristine === true ? true : false,
    });
  }
}
