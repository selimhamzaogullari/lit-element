import {createStore} from 'zustand/vanilla';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mockData} from '../../mockData';
import {randomId} from '../utils/helper';

export const useEmployeeStore = createStore()(
  persist(
    (set, get) => ({
      employees: mockData,
      deleteEmployee: (id) => {
        set({
          employees: get().employees.filter((employee) => employee.id !== id),
        });
      },
      addEmployee: (employee) => {
        const newEmployee = {id: randomId(), ...employee};
        set({
          employees: [newEmployee, ...get().employees],
        });
      },
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
