// types

export const columns = {
  NameSurname: 0,
  Company: 1,
  Email: 2,
  Date: 3,
  Country: 4,
  City: 5,
} as const;

export type Columns = typeof columns[keyof typeof columns];

export type OrderKey = "NAME_ASC" | "NAME_DESC" | "YEAR_ASC" | "YEAR_DESC";

export interface GetEmployeesProps {
  search?: string;
  order?: OrderKey;
  limit?: number;
  page?: number;
}

// utility functions

const isTargetContains = (search: string, target: string): boolean => {
  return target.toLowerCase().includes(search.toLowerCase());
};

const orderBy = (employees: string[][], order: OrderKey): string[][] => {
  switch (order) {
    case "NAME_ASC":
      return employees.sort((a, b) =>
        a[columns.NameSurname].toLowerCase() >
        b[columns.NameSurname].toLowerCase()
          ? 1
          : -1,
      );

    case "NAME_DESC":
      return employees.sort((a, b) =>
        a[columns.NameSurname].toLowerCase() <
        b[columns.NameSurname].toLowerCase()
          ? 1
          : -1,
      );

    case "YEAR_ASC":
      return employees.sort((a, b) =>
        new Date(a[columns.Date]) > new Date(b[columns.Date]) ? 1 : -1,
      );

    case "YEAR_DESC":
      return employees.sort((a, b) =>
        new Date(a[columns.Date]) < new Date(b[columns.Date]) ? 1 : -1,
      );

    default:
      return employees;
  }
};

// DB functions

export const getEmployees = ({
  search,
  order,
  limit,
  page,
}: GetEmployeesProps): { data: string[][]; count: number; pages: number } => {
  const employeeDBStorage = localStorage.getItem("employeeDB");
  let result: string[][] = [];
  let count = 0;
  let pages = 0;
  if (employeeDBStorage) {
    const employeeDB: string[][] = JSON.parse(employeeDBStorage);
    result = employeeDB;
    if (search !== undefined) {
      result = result.filter((employee) =>
        isTargetContains(search, employee[0]),
      );
    }

    count = result.length;
    if (order !== undefined) {
      result = orderBy(result, order);
    }
    if (limit !== undefined && page !== undefined) {
      pages = Math.ceil(count / limit);
      result = result.slice((page - 1) * limit, (page - 1) * limit + limit);
    }
  }

  return { data: result, count, pages };
};
