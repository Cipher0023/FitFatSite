// app/store.ts
import { create } from 'zustand';

type AppStore = {
  isMenuOpen: boolean;
  isSettingsOpen: boolean;
  isDarkMode: boolean;
  toggleMenu: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleDarkMode: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isMenuOpen: false,
  isSettingsOpen: false,
  isDarkMode: false,
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openSettings: () => set({ isSettingsOpen: true, isMenuOpen: false }),
  closeSettings: () => set({ isSettingsOpen: false }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));