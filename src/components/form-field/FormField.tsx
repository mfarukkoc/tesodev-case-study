/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const FormFieldLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const FormFieldTitle = styled.span<{ hasError?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #686868;
  padding: 0px 3px 10px 3px;
  ${(props) => props.hasError && { color: "rgba(255, 0, 0, 0.7)" }}
`;

const ErrorMessage = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  color: rgba(255, 0, 0, 0.5);

  margin: 10px 3px 0px 3px;
`;

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  labelFor?: string;
  errorMessage?: string;
}

const FormField = ({
  children,
  label,
  labelFor,
  errorMessage,
}: FormFieldProps) => {
  return (
    <Wrapper>
      <FormFieldLabel htmlFor={labelFor}>
        <FormFieldTitle hasError={errorMessage !== undefined}>
          {label}
        </FormFieldTitle>
        {children}
      </FormFieldLabel>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
};

export default FormField;
