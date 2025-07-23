import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import mockData from './mockData';

export const useEmployeeStore = create()(
  persist(
    (set, get) => ({
      employees: mockData,
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
