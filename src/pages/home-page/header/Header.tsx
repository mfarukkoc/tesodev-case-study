import styled from "styled-components";
import Button from "../../../components/button/Button";
import tesodevLogo from "../../../assets/tesodev-big.svg";

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

export interface HeaderProps {
  onAddNewRecord: () => void;
}

const Header = ({ onAddNewRecord }: HeaderProps) => {
  return (
    <>
      <HeaderRow>
        <LogoWrapper>
          <img src={tesodevLogo} alt="tesodev logo" />
        </LogoWrapper>
        <RightAlignButton onClick={onAddNewRecord}>
          Add new record
        </RightAlignButton>
      </HeaderRow>
      <LogoSubText>Search web app</LogoSubText>
    </>
  );
};

export default Header;
