import React from 'react';
import ReactDOM from 'react-dom';
import { Position, StyleTransformer, RenderContainerProps } from './types';
import { Direction, defaultStyleTransformer } from './utils';
import { CardProps } from './Card';
import { CardPassthrough } from './CardPassthrough';

interface CardDeckProps {
  onEnd?(): void;
  className?: string;
  children: React.ReactElement<CardProps>[];
  styleTransformer?: StyleTransformer;
  renderContainer(props: RenderContainerProps): React.ReactNode;
}

interface CardDeckState {
  index: number;
  containerSize: Position;
}

export class CardDeck extends React.Component<CardDeckProps, CardDeckState> {
  constructor(props: CardDeckProps) {
    super(props);
    this.state = {
      index: 0,
      containerSize: { x: 0, y: 0 },
    };
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  handleRemoveCard(side: Direction) {
    const { children, onEnd } = this.props;

    if (
      Array.isArray(children) &&
      children.length === this.state.index + 1 &&
      onEnd
    ) {
      onEnd();
    }

    this.setState({
      index: this.state.index + 1,
    });
  }

  componentDidMount() {
    this.setSize();
    window.addEventListener('resize', this.setSize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize);
  }

  setSize() {
    const container = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const containerSize = {
      x: container.offsetWidth,
      y: container.offsetHeight,
    };

    this.setState({ containerSize });
  }

  render() {
    const { index, containerSize } = this.state;
    const { children, styleTransformer, renderContainer } = this.props;

    if (!Array.isArray(children) || !containerSize.x || !containerSize.y) {
      return renderContainer({ isEmpty: true, children: null });
    }

    const _cards = (children as React.ReactElement<CardProps>[])
      .slice(index, index + 2)
      .map((card: React.ReactElement<CardProps>, index: number) => (
        <CardPassthrough
          key={card.props.id}
          containerSize={containerSize}
          index={card.props.id}
          onOutScreenTop={() => this.handleRemoveCard(Direction.Top)}
          onOutScreenBottom={() => this.handleRemoveCard(Direction.Bottom)}
          onOutScreenLeft={() => this.handleRemoveCard(Direction.Left)}
          onOutScreenRight={() => this.handleRemoveCard(Direction.Right)}
          active={index === 0}
          styleTransformer={styleTransformer || defaultStyleTransformer}
          {...card.props}
        />
      ));

    return renderContainer({ isEmpty: _cards.length > 0, children: _cards });
  }
}
