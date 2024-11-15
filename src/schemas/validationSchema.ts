import * as Yup from "yup";

export const memberFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "Must be at least 18 years old")
    .max(65, "Must be 65 years old or younger"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(010|011|012|015)[0-9]{8}$/,
      "Mobile number must start with '010', '011', '012', or '015' and contain exactly 11 digits."
    ),
});
