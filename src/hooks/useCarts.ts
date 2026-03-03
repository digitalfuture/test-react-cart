import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCarts, fetchCart, updateCart } from '../api/carts';
import type { UpdateCartPayload } from '../types';

export const cartKeys = {
  all: ['carts'] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  list: (filters: { skip: number; limit: number }) =>
    [...cartKeys.lists(), filters] as const,
  details: () => [...cartKeys.all, 'detail'] as const,
  detail: (id: number) => [...cartKeys.details(), id] as const,
};

export function useCarts(skip: number, limit: number) {
  return useQuery({
    queryKey: cartKeys.list({ skip, limit }),
    queryFn: () => fetchCarts(limit, skip),
  });
}

export function useCart(id: number) {
  return useQuery({
    queryKey: cartKeys.detail(id),
    queryFn: () => fetchCart(id),
    enabled: id > 0,
  });
}

export function useUpdateCart() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCartPayload }) =>
      updateCart(id, payload),
    // Don't update cache from server response - DummyJSON doesn't persist changes
    // Optimistic updates are handled in the component
  });
}
