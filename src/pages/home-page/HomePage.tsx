import { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getEmployees } from "../../@fake-db/employeeDB";

import Header from "./header/Header";
import SearchBoxRow from "./search-box-row/SearchBoxRow";

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
      <Header onAddNewRecord={() => history.push("/new-record")} />
      <SearchBoxRow
        searchValue={searchValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        results={results}
        onSearch={() => {
          const newQuery = new URLSearchParams({
            search: searchValue,
          });
          history.push({
            pathname: "/result",
            search: newQuery.toString(),
          });
        }}
      />
    </Container>
  );
};

export default HomePage;
