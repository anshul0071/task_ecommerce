/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore([]);

// Custom hook to access the location for testing purposes
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

// Custom render function that includes MemoryRouter and initialEntries
const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
  return {
    ...render(
      <Provider store={mockStore({})}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={ui} />
            <Route path="/signup" element={<div>Signup Page</div>} />
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe('Login Component', () => {
  it('navigates to signup page when "Go to Signup" button is clicked', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Login />);

    fireEvent.click(getByRole('button', { name: /Go to Signup/i }));

    // Assert that the navigation to signup page occurred
    expect(getByTestId('location-display').textContent).toBe('/signup');
  });
});



