import { create } from 'zustand';

interface CartStore {
  currentPage: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  currentPage: 0,
  limit: 10,
  setPage: (page) => set({ currentPage: page }),
  setLimit: (limit) => set({ limit, currentPage: 0 }),
}));
