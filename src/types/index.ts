export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  discountedTotal: number;
}

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface UpdateCartPayload {
  merge: boolean;
  products: { id: number; quantity: number }[];
}
