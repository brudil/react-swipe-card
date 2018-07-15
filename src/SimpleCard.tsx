import React from 'react';
import ReactDOM from 'react-dom';
import { Position } from './types';
import { translate3d } from './utils';

export interface SimpleCardProps {
  containerSize: Position;
  className?: string;
  index: number;
  style?: React.CSSProperties;
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
    const {
      initialPosition,
    } = this.state;
    const { className = 'inactive' } = this.props;
    var style = {
      ...translate3d(initialPosition, initialPosition),
      zIndex: this.props.index,
      ...this.props.style,
    };

    return (
      <div style={style} className={`card ${className}`}>
        {this.props.children}
      </div>
    );
  }
}
