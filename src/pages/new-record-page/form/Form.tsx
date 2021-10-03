import styled from "styled-components";
import { Formik, Form as FormikForm, FormikProps, FormikHelpers } from "formik";
import FormField from "../../../components/form-field/FormField";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import validationSchema from "./validationSchema";

const FormControlWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface NewRecordForm {
  nameSurname: string;
  country: string;
  city: string;
  email: string;
}

export interface FormProps {
  onSubmit: (
    values: NewRecordForm,
    actions: FormikHelpers<NewRecordForm>,
  ) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  return (
    <Formik
      initialValues={{
        nameSurname: "",
        country: "",
        city: "",
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<NewRecordForm>) => {
        const { values, touched, errors, handleChange, handleBlur } = props;
        return (
          <FormikForm>
            <FormField
              label="Name Surname"
              errorMessage={
                errors.nameSurname && touched.nameSurname
                  ? errors.nameSurname
                  : undefined
              }
            >
              <Input
                name="nameSurname"
                value={values.nameSurname}
                placeholder="Enter name and surname"
                onChange={handleChange}
                hasError={!!(errors.nameSurname && touched.nameSurname)}
                onBlur={handleBlur}
              />
            </FormField>
            <FormField
              label="Country"
              errorMessage={
                errors.country && touched.country ? errors.country : undefined
              }
            >
              <Input
                name="country"
                value={values.country}
                placeholder="Enter a country"
                onChange={handleChange}
                hasError={!!(errors.country && touched.country)}
                onBlur={handleBlur}
              />
            </FormField>
            <FormField
              label="City"
              errorMessage={
                errors.city && touched.city ? errors.city : undefined
              }
            >
              <Input
                name="city"
                value={values.city}
                placeholder="Enter a city"
                onChange={handleChange}
                hasError={!!(errors.city && touched.city)}
                onBlur={handleBlur}
              />
            </FormField>
            <FormField
              label="Email"
              errorMessage={
                errors.email && touched.email ? errors.email : undefined
              }
            >
              <Input
                name="email"
                value={values.email}
                placeholder="Enter a e-mail"
                onChange={handleChange}
                hasError={!!(errors.email && touched.email)}
                onBlur={handleBlur}
              />
            </FormField>
            <FormControlWrap>
              <Button type="submit">Add</Button>
            </FormControlWrap>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
