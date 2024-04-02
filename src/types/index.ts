export interface IPage {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
  [key: string]: string | number | boolean | object;
}

export interface IPricePlan {
  id: number;
  description: string;
  active: boolean
  createdAt: string;
  removedAt: string;
  [key: string]: string | number | boolean
}

export interface IProduct {
  id: number;
  name: string;
  options: IOption
  active: boolean;
  createdAt: string;
  [key: string]: string | number | boolean | IOption
}

interface IOption {
  size: string;
  amount: number;
}
