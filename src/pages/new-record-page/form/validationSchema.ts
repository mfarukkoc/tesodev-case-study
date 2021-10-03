import * as Yup from "yup";

const validationSchema = Yup.object().shape({
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
});

export default validationSchema;
