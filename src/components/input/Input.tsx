import styled from "styled-components";

const Input = styled.input<{ hasError?: boolean }>`
  background: #ffffff;
  border: 1px solid ${(props) => (props.hasError ? "#FF0000" : "#000000")};
  border-radius: 8px;
  padding: 10px 17px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  transition: 0.3s;
  :hover {
    background: rgba(100, 100, 100, 0.08);
    border-color: ${(props) => !props.hasError && "rgba(0, 0, 0, 0.6)"};
  }
  ::placeholder {
    color: ${(props) =>
      props.hasError ? "rgba(255, 0, 0, 0.5)" : "rgba(100, 100, 100, 0.5)"};
  }
`;

export default Input;
