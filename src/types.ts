export interface Position {
  x: number;
  y: number;
}

export interface CardOutActions {
  onOutScreenRight: (index: number) => void;
  onOutScreenLeft: (index: number) => void;
  onOutScreenBottom: (index: number) => void;
  onOutScreenTop: (index: number) => void;
}

export interface RenderContainerProps {
  children: any;
  isEmpty: boolean;
}

export interface CardRendererProps {
  style: any;
  isPristine: boolean;
  shouldTransition: boolean;
}

export type CardRenderProp = (props: CardRendererProps) => React.ReactNode;

export type StyleTransformer = (
  currentPosition: Position,
  initialPosition: Position,
) => React.CSSProperties;
