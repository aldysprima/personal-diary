import * as yup from "yup";

export const validateRegister = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email is invalid")
    .required("Email is required"),
  username: yup
    .string("Enter your username")
    .matches(/^[a-z0-9]+$/i, "Must Only Contain Alphanumeric Characters")
    .required("Username is required"),
  password: yup
    .string()
    .matches(/^[a-z0-9]+$/i, "Must Only Contain Alphanumeric Characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
