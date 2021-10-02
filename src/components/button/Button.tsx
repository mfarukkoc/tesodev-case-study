import styled from "styled-components";

const Button = styled.button`
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background: #204080;

  border-radius: 8px;
  border: none;

  padding: 10.5px 22px;

  cursor: pointer;

  transition: 0.3s;
  :hover {
    background: #4f75c2;
  }
`;

export default Button;
