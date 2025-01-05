import { create } from "zustand";

export const useNavbarStore = create()((set) => ({
    isOpen: false,
    setIsOpen: (value) => set((state) => ({ ...state, isOpen: value })),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
