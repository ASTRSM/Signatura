import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';
import Login from '../src/pages/Login';

describe('Login', () => {
  it('should renders correctly', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should found the login button disabled if inputs are empty', () => {
    renderWithProviders(<Login />);

    const loginButton = screen.getByText('LOGIN');

    expect(loginButton).toBeDisabled();
  });

  it('should throw an error & disabled button if email is not valid', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.changeText(emailInput, 'Email');

    expect(screen.getByText('Email is not valid')).toBeTruthy();
    expect(loginButton).toBeDisabled();
  });

  it('should throw an error & disabled button if password is below 8 characters', () => {
    renderWithProviders(<Login />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.changeText(passwordInput, '1234567');

    expect(
      screen.getByText('Password must be at least 8 characters'),
    ).toBeTruthy();
    expect(loginButton).toBeDisabled();
  });

  it('should found the login button enabled if inputs are filled', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.changeText(emailInput, 'example@email.com');
    fireEvent.changeText(passwordInput, 'password');

    expect(loginButton).toBeEnabled();
  });
});
