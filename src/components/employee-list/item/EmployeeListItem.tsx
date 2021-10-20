import styled from "styled-components";

const ListItemContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.gap};
  border-radius: 4px;
  padding: 10px 9px 12px 9px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background: #c4c4c4;
  }
`;

const ListItemRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ListItemHeader = styled.p`
  font-family: "Roboto";
  color: #484848;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    overflow: visible;
  }
`;

const ListItemSubText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  margin: 0;
  transition: 0.3s;
  color: #686868;

  ${ListItemContainer}:hover & {
    color: #ffffff;
  }
`;

const HorizontalLine = styled.div`
  border-top: 1px solid #585858;
  margin-top: 7px;
  transform: matrix(1, 0, 0, 1, 0, 0);
`;

export interface EmployeeListItemProps {
  nameSurname: string;
  date: string;
  email: string;
  country: string;
  city: string;
  gap?: `${string}px`;
}

const EmployeeListItem = ({
  nameSurname,
  date,
  email,
  country,
  city,
  gap,
}: EmployeeListItemProps) => {
  return (
    <ListItemContainer gap={gap}>
      <ListItemRow>
        <ListItemHeader>
          {country} - {city}
        </ListItemHeader>
        <ListItemHeader>Email: {email}</ListItemHeader>
      </ListItemRow>
      <ListItemRow>
        <ListItemSubText>
          {nameSurname} - {date.split("/")[2]}
        </ListItemSubText>
      </ListItemRow>
      <div>
        <HorizontalLine />
      </div>
    </ListItemContainer>
  );
};

export default EmployeeListItem;
