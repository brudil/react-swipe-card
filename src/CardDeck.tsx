import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Position } from './types';
import { Direction } from './utils';
import { CardProps } from './Card';
import { CardPassthrough } from './CardPassthrough';

interface CardDeckProps {
  onEnd?(): void;
  className?: string;
  children: React.ReactElement<CardProps>[];
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
    const { children, className } = this.props;
    console.log({ children, containerSize });
    if (!Array.isArray(children) || !containerSize.x || !containerSize.y) {
      return <div className={className} />;
    }

    const _cards = children.reduce((acculated, currentCard, currentIndex) => {
      if (index > currentIndex) return acculated;
      const props = {
        key: currentIndex,
        containerSize,
        index: children.length - index,
        onOutScreenTop: () => this.handleRemoveCard(Direction.Top),
        onOutScreenBottom: () => this.handleRemoveCard(Direction.Bottom),
        onOutScreenLeft: () => this.handleRemoveCard(Direction.Left),
        onOutScreenRight: () => this.handleRemoveCard(Direction.Right),
        active: index === currentIndex,
      };
      return [
        createElement(CardPassthrough, { ...props, ...currentCard.props }),
        ...acculated,
      ];
    }, []);

    console.log(_cards);

    return (
      <div className={className}>
        <div id="cards">{_cards}</div>
      </div>
    );
  }
}
