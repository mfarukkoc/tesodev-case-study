import styled from "styled-components";

export interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationWrap = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 11px;
`;
const PaginationItem = styled.div<{ isActive?: boolean; isDots?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: ${({ isActive }) => (isActive ? " #FFFFFF" : "#484848")};
  padding: 4px 8px;
  border: 1px solid #484848;
  border-radius: 4px;
  background: ${({ isActive }) => (isActive ? " #204080" : null)};
  cursor: ${({ isDots }) => (isDots ? "normal" : "pointer")};
`;

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pages = [];
  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i += 1) pages.push({ label: i, page: i });
  } else {
    let startIndex = 1;

    const finishDiff = totalPage - currentPage;

    if (currentPage <= 3) {
      startIndex = 1;
      for (let i = 0; i < 4; i += 1) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = totalPage - 1; i <= totalPage; i += 1) {
        pages.push({ label: i, page: i });
      }
    } else if (finishDiff <= 3) {
      startIndex = currentPage - (4 - finishDiff - 1);
      for (let i = 1; i < 3; i += 1) {
        pages.push({ label: i, page: i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = 0; i < 4; i += 1) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
    } else {
      startIndex = currentPage - 1;
      for (let i = 1; i < 3; i += 1) {
        pages.push({ label: i, page: i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = 0; i < 3; i += 1) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = totalPage - 1; i <= totalPage; i += 1) {
        pages.push({ label: i, page: i });
      }
    }
  }
  return (
    <PaginationWrap>
      <PaginationItem
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
      >
        Previous
      </PaginationItem>
      {pages.map(({ label, page }, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <PaginationItem
          key={`page-${index + 1}`}
          isActive={page === currentPage}
          onClick={() => {
            if (page !== 0) onPageChange(page);
          }}
          isDots={label === "..."}
        >
          {label}
        </PaginationItem>
      ))}
      <PaginationItem
        onClick={() => {
          if (currentPage < totalPage) onPageChange(currentPage + 1);
        }}
      >
        Next
      </PaginationItem>
    </PaginationWrap>
  );
};

export default Pagination;
