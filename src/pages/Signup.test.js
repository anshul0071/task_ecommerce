/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Signup from './Signup';
import { signup } from '../redux/auth/authActions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('../redux/auth/authActions', () => ({
  signup: jest.fn()
}));

const mockStore = configureStore([]);

// Custom hook to access the location for testing purposes
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

// Custom render function that includes MemoryRouter and initialEntries
const renderWithRouter = (ui, { initialEntries = ['/signup'] } = {}) => {
  return {
    ...render(
      <Provider store={mockStore({})}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/signup" element={ui} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe('Signup Component', () => {
  it('navigates to login page after successful signup', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    renderWithRouter(<Signup />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Test User' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Verify that the signup action was dispatched
    expect(dispatchMock).toHaveBeenCalledWith(signup({
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
      fullName: 'Test User'
    }));

    // Verify that the navigation to login page occurred
    expect(screen.getByTestId('location-display').textContent).toBe('/login');

    // Verify that the user data is stored in local storage
    expect(localStorage.getItem('userName')).toBe('testuser');
    expect(localStorage.getItem('password')).toBe('password123');
  });
});

