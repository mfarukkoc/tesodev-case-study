import styled from "styled-components";
import { columns } from "../../@fake-db/employeeDB";
import EmployeeListItem from "./item/EmployeeListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface EmployeeListProps {
  employees: string[][];
  gap?: `${string}px`;
}

const EmployeeList = ({ employees, gap }: EmployeeListProps) => {
  return (
    <Wrapper>
      {employees.length === 0 ? (
        <>No record found..</>
      ) : (
        employees.map((employee: string[]) => (
          <EmployeeListItem
            key={`employee${employee[columns.Email]}`}
            city={employee[columns.City]}
            country={employee[columns.Country]}
            nameSurname={employee[columns.NameSurname]}
            date={employee[columns.Date]}
            email={employee[columns.Email]}
            gap={gap}
          />
        ))
      )}
    </Wrapper>
  );
};

export default EmployeeList;
