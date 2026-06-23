// types.ts

export type TextAlign = 'left' | 'center' | 'right';

export type LabelItem =
  | {
      id: string;
      type: 'text';
      text: string;
      fontSize: number;
      bold: boolean;
      align: TextAlign;
    }
  | {
      id: string;
      type: 'space';
      height: number;
    };

export type Label = {
  id: number;
  items: LabelItem[];
};