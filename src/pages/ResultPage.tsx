import { ChangeEvent, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/button/Button";
import SearchBox from "../components/search-box/SearchBox";
import searchPageLogo from "../assets/images/logo-search-page.png";
import orderByIcon from "../assets/images/order-by-icon.png";
import { getEmployees, OrderKey } from "../@fake-db/employeeDB";
import EmployeeList from "../components/employee-list/EmployeeList";
import Pagination from "../components/pagination/Pagination";
import OrderByDropdown from "../components/order-by-dropdown/OrderByDropdown";

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-column-gap: 35px;
  align-items: center;
  margin: 27px 35px 93px 35px;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: calc(60% - 70px);
  justify-content: center;
  @media (max-width: 900px) {
    grid-template-columns: 90%;
  }
`;

const Logo = styled.img`
  cursor: pointer;
`;

const CustomOrderByDropdown = styled(OrderByDropdown)`
  margin-left: auto;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const MinContentButton = styled(Button)`
  width: min-content;
`;

const ResultPage = () => {
  const [queryParams, setQueryParams] = useState<{
    search?: string;
    page?: string;
    orderBy?: OrderKey;
  }>({});
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderKey, setSelectedOrderKey] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [results, setResults] = useState<{
    data: string[][];
    count: number;
    pages: number;
  }>({ data: [], count: 0, pages: 0 });

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    setQueryParams(params);
  }, [location.search]);

  useEffect(() => {
    setResults(
      getEmployees({
        search: queryParams.search,
        page: currentPage,
        limit: 6,
        order: queryParams.orderBy,
      }),
    );
  }, [queryParams, currentPage]);

  return (
    <div>
      <HeaderRow>
        <Logo
          onClick={() => history.push("/")}
          src={searchPageLogo}
          alt="tesodev logo"
        />
        <SearchBox
          searchValue={searchValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
        />
        <MinContentButton
          onClick={() => {
            const newQueryParams = {
              ...queryParams,
              search: searchValue,
            };
            delete newQueryParams.page;
            setCurrentPage(1);
            const searchParams = new URLSearchParams(newQueryParams);
            setQueryParams(newQueryParams);

            history.replace({
              pathname: "/result",
              search: searchParams.toString(),
            });
          }}
        >
          Search
        </MinContentButton>
      </HeaderRow>
      <ContentRow>
        <CustomOrderByDropdown
          optionList={[
            { label: "Name ascending", itemKey: "NAME_ASC" },
            { label: "Name descending", itemKey: "NAME_DESC" },
            { label: "Year ascending", itemKey: "YEAR_ASC" },
            { label: "Year descending", itemKey: "YEAR_DESC" },
          ]}
          selectedKey={selectedOrderKey}
          onSelect={(itemKey: string) => {
            setSelectedOrderKey(itemKey as OrderKey);
            const newQueryParams = {
              ...queryParams,
              orderBy: null || (itemKey as OrderKey),
            };
            delete newQueryParams.page;
            setCurrentPage(1);
            const searchParams = new URLSearchParams(newQueryParams);
            setQueryParams(newQueryParams);

            history.replace({
              pathname: "/result",
              search: searchParams.toString(),
            });
          }}
        >
          <FlexWrap>
            <Logo src={orderByIcon} />
            <div>Order By</div>
          </FlexWrap>
        </CustomOrderByDropdown>
        <EmployeeList employees={results.data} gap="10px" />
        <Pagination
          totalPage={results.pages}
          currentPage={currentPage}
          onPageChange={(page: number) => {
            setCurrentPage(page);
            const newQueryParams = {
              ...queryParams,
              page: null || page.toString(),
            };
            const searchParams = new URLSearchParams(newQueryParams);
            setQueryParams(newQueryParams);

            history.replace({
              pathname: "/result",
              search: searchParams.toString(),
            });
          }}
        />
      </ContentRow>
    </div>
  );
};

export default ResultPage;
