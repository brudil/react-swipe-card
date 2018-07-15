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
