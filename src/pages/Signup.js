import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/auth/authActions';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignupPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.form`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData));
    localStorage.setItem('userName',userData.username);
    localStorage.setItem('password',userData.password);
    navigate("/login");

  };

  return (
    <SignupPageContainer>
      <SignupForm onSubmit={handleSubmit}>
        <h2>Signup</h2>
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
        <InputField
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <Button type="submit">Sign Up</Button>
      </SignupForm>
    </SignupPageContainer>
  );
};

export default Signup;
