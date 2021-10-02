import styled from "styled-components";
import { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import Input from "../input/Input";
import EmployeeList from "../employee-list/EmployeeList";

const SearchBoxWrap = styled.div`
  position: relative;
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const ResultPopup = styled.div`
  position: absolute;
  top: calc(100% + 18px);
  width: 100%;
  z-index: 2;
  background: white;
  border: 1px solid #484848;
  padding: 18px 32px 9px 18px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ShowMore = styled.div`
  margin: 36px auto 0 auto;
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
  cursor: pointer;
`;

export interface SearchBoxProps {
  searchValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  results?: string[][];
  displayShowMore?: boolean;
}

const SearchBox = ({
  searchValue,
  onChange,
  results,
  displayShowMore = true,
}: SearchBoxProps) => {
  const history = useHistory();
  return (
    <SearchBoxWrap>
      <FullWidthInput value={searchValue} onChange={onChange} />
      {searchValue === "" || results === undefined ? null : (
        <ResultPopup>
          <EmployeeList employees={results} />
          {displayShowMore && (
            <ShowMore
              onClick={() => {
                const newQuery = new URLSearchParams({
                  search: searchValue,
                });
                history.push({
                  pathname: "/result",
                  search: newQuery.toString(),
                });
              }}
            >
              Show more..
            </ShowMore>
          )}
        </ResultPopup>
      )}
    </SearchBoxWrap>
  );
};

export default SearchBox;
