import { styled } from "styled-components";

import { useFormik } from "formik";
import { RegisterValidationSchema } from "../validationSchema";
import { ErrorText } from "./Login";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();

  const {
    isSubmitting,
    setSubmitting,
    errors,
    handleSubmit,
    values,
    handleChange,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      await axiosInstance.post("/users", values);
      setSubmitting(false);
      toast.success("User registration successful");
      navigate("/login");
    },
  });

  return (
    <Container>
      <FormContainer>
        <Title>Register</Title>
        <FormGroup>
          <InputContainer>
            <InputLabel>First name</InputLabel>
            <Input
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              type="text"
              placeholder="Input your first name"
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <InputLabel>Last name</InputLabel>
            <Input
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              type="text"
              placeholder="Input your last name"
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              type="text"
              placeholder="Input your email"
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              placeholder="Input your password"
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <InputLabel>Confirm password</InputLabel>
            <Input
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword}</ErrorText>
            )}
          </InputContainer>
          <SubmitButton
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            {isSubmitting ? <FaSpinner className="spin" /> : "Register"}
          </SubmitButton>
        </FormGroup>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 50%;
  margin: 0px auto;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 30px 0px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  margin: 0px auto;
  width: 100px;
  padding: 10px;
  background-color: #5a0b4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #752768;
  }
`;
