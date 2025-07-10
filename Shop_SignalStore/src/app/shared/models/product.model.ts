export type Rating = {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string | null;
  price: number
  rating: Rating;
}
