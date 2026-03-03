import type { Cart, CartsResponse, UpdateCartPayload } from '../types';

const BASE_URL = 'https://dummyjson.com/carts';

export async function fetchCarts(limit: number, skip: number): Promise<CartsResponse> {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Failed to fetch carts');
  }
  return response.json();
}

export async function fetchCart(id: number): Promise<Cart> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
}

export async function updateCart(
  id: number,
  payload: UpdateCartPayload
): Promise<Cart> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update cart');
  }
  return response.json();
}
