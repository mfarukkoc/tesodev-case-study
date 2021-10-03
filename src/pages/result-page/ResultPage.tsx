import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

import orderByIcon from "../../assets/order-by-icon.svg";
import { getEmployees, OrderKey } from "../../@fake-db/employeeDB";
import EmployeeList from "../../components/employee-list/EmployeeList";
import Pagination from "../../components/pagination/Pagination";
import OrderByDropdown from "../../components/order-by-dropdown/OrderByDropdown";
import Header from "./header/Header";

const ContentRow = styled.div`
  display: grid;
  margin-bottom: 27px;
  grid-template-columns: calc(70% - 70px);
  justify-content: center;
  @media (max-width: 900px) {
    grid-template-columns: 90%;
  }
`;

const Icon = styled.img`
  cursor: pointer;
`;

const CustomOrderByDropdown = styled(OrderByDropdown)`
  margin-left: auto;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ResultPage = () => {
  const history = useHistory();
  const location = useLocation();

  const [queryParams, setQueryParams] = useState<{
    search?: string;
    page?: string;
    orderBy?: OrderKey;
  }>({});

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderKey, setSelectedOrderKey] = useState("");

  const [results, setResults] = useState<{
    data: string[][];
    count: number;
    pages: number;
  }>({ data: [], count: 0, pages: 0 });

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    setQueryParams(params);
    setSearchValue(params.search);
  }, [location.search]);

  useEffect(() => {
    setResults(
      getEmployees({
        search: queryParams.search,
        page: parseInt(queryParams.page || "1", 10),
        limit: 6,
        order: queryParams.orderBy,
      }),
    );
  }, [queryParams]);

  return (
    <div>
      <Header
        onLogoClick={() => history.push("/")}
        onAddNewRecord={() => history.push("/new-record")}
        searchValue={searchValue}
        onSearchValueChange={(value: string) => {
          setSearchValue(value);
        }}
        onSearch={() => {
          const newQueryParams = {
            ...queryParams,
            search: searchValue,
          };
          delete newQueryParams.page;
          setCurrentPage(1);
          const searchParams = new URLSearchParams(newQueryParams);

          history.replace({
            pathname: "/result",
            search: searchParams.toString(),
          });
        }}
      />
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

            history.replace({
              pathname: "/result",
              search: searchParams.toString(),
            });
          }}
        >
          <FlexWrap>
            <Icon src={orderByIcon} />
            <span>Order By</span>
          </FlexWrap>
        </CustomOrderByDropdown>
        <EmployeeList employees={results.data} gap="10px" />
        {results.pages > 1 && (
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

              history.replace({
                pathname: "/result",
                search: searchParams.toString(),
              });
            }}
          />
        )}
      </ContentRow>
    </div>
  );
};

export default ResultPage;
