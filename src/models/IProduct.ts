import { IComment } from './IComment';

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: IComment[];
}
