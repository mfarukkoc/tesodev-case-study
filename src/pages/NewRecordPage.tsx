import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import FormField from "../components/form-field/FormField";
import Input from "../components/input/Input";
import searchPageLogo from "../assets/images/logo-search-page.png";
import leftArrow from "../assets/left-arrow.svg";
import Button from "../components/button/Button";
import { addEmployee } from "../@fake-db/employeeDB";

const PageWrap = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 39px;
  margin: 27px 35px 30px 35px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
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

const NewRecordPage = () => {
  const history = useHistory();
  return (
    <PageWrap>
      <Logo
        onClick={() => history.push("/")}
        src={searchPageLogo}
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
        <Formik
          initialValues={{
            nameSurname: "",
            country: "",
            city: "",
            email: "",
          }}
          validationSchema={Yup.object().shape({
            nameSurname: Yup.string()
              .required("Required field")
              .matches(/^[aA-zZ\s]+$/, "Only letters allowed")
              .min(4, "Minimum 4 characters")
              .max(60, "Maximum 60 characters"),
            country: Yup.string()
              .required("Required field")
              .matches(/^[aA-zZ\s]+$/, "Only letters allowed")
              .min(2, "Minimum 2 characters")
              .max(40, "Maximum 40 characters"),
            city: Yup.string()
              .required("Required field")
              .matches(/^[aA-zZ\s]+$/, "Only letters allowed")
              .min(2, "Minimum 2 characters")
              .max(40, "Maximum 40 characters"),
            email: Yup.string()
              .email("Please enter valid email")
              .required("Required field"),
          })}
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
        >
          {(props: FormikProps<NewRecordForm>) => {
            const { values, touched, errors, handleChange } = props;
            return (
              <Form>
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
                  />
                </FormField>
                <FormField
                  label="Country"
                  errorMessage={
                    errors.country && touched.country
                      ? errors.country
                      : undefined
                  }
                >
                  <Input
                    name="country"
                    value={values.country}
                    placeholder="Enter a country"
                    onChange={handleChange}
                    hasError={!!(errors.nameSurname && touched.nameSurname)}
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
                  />
                </FormField>
                <FormControlWrap>
                  <Button type="submit">Add</Button>
                </FormControlWrap>
              </Form>
            );
          }}
        </Formik>
      </ContentWrap>
    </PageWrap>
  );
};
export default NewRecordPage;
