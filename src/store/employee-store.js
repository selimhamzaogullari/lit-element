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
      addEmployee: (newEmployee) => {
        const existEmployee = get().employees.find(
          (employee) => employee.email === newEmployee.email
        );
        const _newEmployee = {id: randomId(), ...newEmployee};
        set({
          employees: existEmployee
            ? get().employees
            : [_newEmployee, ...get().employees],
        });
        return !existEmployee;
      },
      editEmployee: (editedEmployee) => {
        const existEmployee = get().employees.find(
          (employee) =>
            employee.email === editedEmployee.email &&
            employee.id !== editedEmployee.id
        );
        set({
          employees: existEmployee
            ? get().employees
            : get().employees.map((employee) =>
                employee.id === editedEmployee.id ? editedEmployee : employee
              ),
        });
        return !existEmployee;
      },
      getEmployee: (id) => {
        return get().employees.find((employee) => employee.id == id);
      },
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
