import styled from "styled-components";
import { ChangeEvent } from "react";
import Button from "../../../components/button/Button";
import SearchBox from "../../../components/search-box/SearchBox";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 16px;
  margin-top: 44px;
`;

const MinContentButton = styled(Button)`
  width: min-content;
`;

export interface SearchBoxRowProps {
  searchValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  results: {
    data: string[][];
    count: number;
    pages: number;
  };
  onSearch: () => void;
}

const SearchBoxRow = ({
  searchValue,
  onChange,
  results,
  onSearch,
}: SearchBoxRowProps) => {
  return (
    <Wrapper>
      <SearchBox
        searchValue={searchValue}
        onChange={onChange}
        results={results.data}
        displayShowMore={results.count > 3}
      />
      <MinContentButton onClick={onSearch}>Search</MinContentButton>
    </Wrapper>
  );
};

export default SearchBoxRow;
