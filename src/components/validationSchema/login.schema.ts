import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),
});
