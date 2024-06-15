import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Add some bottom margin */
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SignUpButton = styled(Button)`
  background-color: #28a745; 
   width: 25%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Toast = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4444;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const Login = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
    if (
      userData.username === localStorage.getItem("userName") &&
      userData.password === localStorage.getItem("password")
    ) {
      localStorage.setItem("auth", true);
      navigate("/products");
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <LoginPageContainer>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <InputField
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <InputField
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Button type="submit">Login</Button>
        </LoginForm>
        <SignUpButton onClick={handleClick}>Go to Signup</SignUpButton>
      </LoginPageContainer>
      <Toast show={showToast}>Please Signup </Toast>
    </>
  );
};

export default Login;
