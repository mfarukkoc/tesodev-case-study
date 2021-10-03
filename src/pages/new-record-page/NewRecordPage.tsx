import { useHistory } from "react-router-dom";
import styled from "styled-components";

import tesodevLogo from "../../assets/tesodev-small.svg";
import leftArrow from "../../assets/left-arrow.svg";
import { addEmployee } from "../../@fake-db/employeeDB";
import Form from "./form/Form";

const PageWrap = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 39px;
  margin: 27px 35px 30px 35px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Logo = styled.img`
  cursor: pointer;
`;

const ReturnBackDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  height: 63px;
  margin-bottom: 65px;
  color: #484848;
`;

const NewRecordPage = () => {
  const history = useHistory();
  return (
    <PageWrap>
      <Logo
        onClick={() => history.push("/")}
        src={tesodevLogo}
        alt="tesodev logo"
      />
      <ContentWrap>
        <ReturnBackDiv>
          <Logo
            onClick={() => history.goBack()}
            src={leftArrow}
            alt="left arrow"
          />
          Return to List Page
        </ReturnBackDiv>
        <Form
          onSubmit={(values, actions) => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
            const yyyy = today.getFullYear();

            const todayString = `${mm}/${dd}/${yyyy}`;

            addEmployee({
              ...values,
              date: todayString,
              company: "Undefined",
            });

            actions.resetForm();

            history.goBack();
          }}
        />
      </ContentWrap>
    </PageWrap>
  );
};
export default NewRecordPage;
