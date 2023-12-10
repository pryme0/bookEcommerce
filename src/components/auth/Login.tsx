import { styled } from "styled-components";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../validationSchema";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api";

export const Login = () => {
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
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await axiosInstance.post("/users/login", values);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("cart", JSON.stringify(response.data.cart));
        return navigate("/");
      } catch (error: any) {
        console.error("Error:", error.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <FormGroup>
          <InputContainer>
            <InputLabel>Email</InputLabel>
            <Input
              onChange={handleChange}
              type="email"
              placeholder="Input your email"
              value={values.email}
              name="email"
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <InputLabel>Password</InputLabel>
            <Input
              onChange={handleChange}
              type="password"
              placeholder="Input your password"
              value={values.password}
              name="password"
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputContainer>
          <SubmitButton
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            {isSubmitting ? <FaSpinner className="spin" /> : "Login"}
          </SubmitButton>
        </FormGroup>
        <p>
          Don't have an account? <Link to="/login">Register</Link>
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

export const ErrorText = styled.p`
  color: rgb(178, 9, 9);
  font-size: 14px;
  margin-top: 2px;
  margin-bottom: 0px;
`;
