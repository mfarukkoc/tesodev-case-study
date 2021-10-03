import styled from "styled-components";
import { ChangeEvent } from "react";
import SearchBox from "../../../components/search-box/SearchBox";
import Button from "../../../components/button/Button";
import tesodevLogo from "../../../assets/tesodev-small.svg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 50% auto auto;
  grid-column-gap: 35px;
  align-items: center;
  margin: 27px 35px 93px 35px;
  @media (max-width: 925px) {
    grid-template-columns: auto min-content;
    grid-template-rows: auto auto;
    grid-row-gap: 17px;
    margin-bottom: 27px;
  }
`;
const Logo = styled.img`
  cursor: pointer;
`;
const MinContentButton = styled(Button)`
  width: min-content;
  @media (max-width: 925px) {
    width: unset;
  }
`;

const RightAlignButton = styled(Button)`
  white-space: nowrap;
  margin-left: auto;
  @media (max-width: 925px) {
    grid-column-start: 2;
    grid-row-start: 1;
  }
`;

export interface HeaderProps {
  onLogoClick: () => void;
  searchValue: string;
  onSearchValueChange: (searchValue: string) => void;
  onSearch: () => void;
  onAddNewRecord: () => void;
}

const Header = ({
  onLogoClick,
  searchValue,
  onSearchValueChange,
  onSearch,
  onAddNewRecord,
}: HeaderProps) => {
  return (
    <Wrapper>
      <Logo onClick={onLogoClick} src={tesodevLogo} alt="tesodev logo" />
      <SearchBox
        searchValue={searchValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onSearchValueChange(event.target.value);
        }}
      />
      <MinContentButton onClick={onSearch}>Search</MinContentButton>
      <RightAlignButton onClick={onAddNewRecord}>
        Add new record
      </RightAlignButton>
    </Wrapper>
  );
};

export default Header;
