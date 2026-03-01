import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    _id: string;
    title: string;
    artist: string;
    year: string;
    price?: number;
    showPrice?: boolean;
    startingPrice?: number;
    imageUrl: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getCartTotals: () => { total: number; hasEstimate: boolean };
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                // Prevent duplicates
                if (state.items.find((i) => i._id === item._id)) {
                    return state;
                }
                return { items: [...state.items, item] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i._id !== id)
            })),
            clearCart: () => set({ items: [] }),
            getCartTotals: () => {
                const { items } = get();
                if (items.length === 0) return { total: 0, hasEstimate: false };

                let total = 0;
                let hasEstimate = false;

                for (const item of items) {
                    if (item.showPrice && item.price) {
                        total += item.price;
                    } else if (item.startingPrice) {
                        total += item.startingPrice;
                        hasEstimate = true;
                    } else {
                        // If no starting price at all, just flag as estimate and add 0
                        hasEstimate = true;
                    }
                }
                return { total, hasEstimate };
            },
            isOpen: false,
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'shakya-inquiry-cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
