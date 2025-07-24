import {createStore} from 'zustand/vanilla';
import {persist, createJSONStorage} from 'zustand/middleware';

export const useAppStore = createStore()(
  persist(
    (set, get) => ({
      lang: null,
      setLang: (lang) => set({lang}),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
