import { ReactNode, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import OrderByDropdownItem from "./item/OrderByDropdownItem";

const Wrapper = styled.div`
  position: relative;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #484848;
  padding: 6px 3px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: absolute;
  border: 1px solid #484848;
  border-radius: 4px;
  padding: 8px 7px;
  background: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: max-content;
  left: 50%;
  top: calc(100% + 11px);
  gap: 3px;
  @media (max-width: 925px) {
    left: 0%;
  }
`;

export interface OrderByDropdownProps {
  className?: string;
  children: ReactNode;
  optionList: {
    label: string;
    itemKey: string;
  }[];
  selectedKey: string;
  onSelect: (itemKey: string) => void;
}
const OrderByDropdown = ({
  className,
  optionList,
  children,
  selectedKey,
  onSelect,
}: OrderByDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);
  return (
    <Wrapper className={className} onClick={() => setIsOpen(!isOpen)} ref={ref}>
      {children}
      {isOpen && (
        <Popup>
          {optionList.map((option) => (
            <OrderByDropdownItem
              label={option.label}
              itemKey={option.itemKey}
              key={option.itemKey}
              onClick={(itemKey) => {
                onSelect(itemKey);
                setIsOpen(false);
              }}
              isSelected={option.itemKey === selectedKey}
            />
          ))}
        </Popup>
      )}
    </Wrapper>
  );
};

export default OrderByDropdown;
