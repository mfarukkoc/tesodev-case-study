import styled from "styled-components";

const Wrapper = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  border-radius: 4px;
  transition: 0.3s;
  padding: 9px 6px;
  ${(props) =>
    props.isSelected
      ? {
          background: "#c4c4c4",
          color: "#ffffff",
        }
      : null}

  :hover {
    background: #c4c4c4;
    color: #ffffff;
  }
`;

export interface OrderByDropdownItemProps {
  label: string;
  itemKey: string;
  isSelected: boolean;
  onClick: (itemKey: string) => void;
}

const OrderByDropdownItem = ({
  label,
  itemKey,
  onClick,
  isSelected,
}: OrderByDropdownItemProps) => {
  return (
    <Wrapper
      onClick={() => {
        onClick(itemKey);
      }}
      isSelected={isSelected}
    >
      {label}
    </Wrapper>
  );
};

export default OrderByDropdownItem;
