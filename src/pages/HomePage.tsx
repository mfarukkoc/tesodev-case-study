import { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getEmployees } from "../@fake-db/employeeDB";
import tesodevLogo from "../assets/tesodev-big.svg";
import Button from "../components/button/Button";
import SearchBox from "../components/search-box/SearchBox";

const Container = styled.div`
  width: 68%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  align-items: center;
  height: min-content;
  @media (max-width: 925px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }
`;

const RightAlignButton = styled(Button)`
  margin-left: auto;
`;

const LogoWrapper = styled.div`
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  @media (max-width: 925px) {
    grid-row-start: 2;
    grid-column-start: unset;
  }
`;

const LogoSubText = styled.p`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: bold;
  align-self: center;
  display: flex;
  margin-top: 10px;
  margin-left: 220px;
`;

const SearchBoxRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 16px;
  margin-top: 44px;
`;

const MinContentButton = styled(Button)`
  width: min-content;
`;

const HomePage = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<{
    data: string[][];
    count: number;
    pages: number;
  }>({ data: [], count: 0, pages: 0 });

  useEffect(() => {
    setResults(getEmployees({ search: searchValue, limit: 3, page: 1 }));
  }, [searchValue]);

  return (
    <Container>
      <HeaderRow>
        <LogoWrapper>
          <img src={tesodevLogo} alt="tesodev logo" />
        </LogoWrapper>
        <RightAlignButton onClick={() => history.push("/new-record")}>
          Add new record
        </RightAlignButton>
      </HeaderRow>

      <LogoSubText>Search web app</LogoSubText>

      <SearchBoxRow>
        <SearchBox
          searchValue={searchValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
          results={results.data}
          displayShowMore={results.count > 3}
        />
        <MinContentButton
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
          Search
        </MinContentButton>
      </SearchBoxRow>
    </Container>
  );
};

export default HomePage;
