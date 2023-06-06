import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';
import Register from '../src/pages/Register';

describe('Register', () => {
  it('should renders correctly', () => {
    renderWithProviders(<Register />);

    expect(screen.findByText('Register')).toBeTruthy();
  });

  it('should found the register button disabled if inputs are empty', () => {
    renderWithProviders(<Register />);

    const registerButton = screen.getByText('REGISTER');

    expect(registerButton).toBeDisabled();
  });

  it('should throw an error & disabled button if email is not valid', () => {
    renderWithProviders(<Register />);

    const emailInput = screen.getByPlaceholderText('Email');
    const registerButton = screen.getByText('REGISTER');

    fireEvent.changeText(emailInput, 'Email');

    expect(screen.getByText('Email is not valid')).toBeTruthy();
    expect(registerButton).toBeDisabled();
  });

  it('should throw an error & disabled button if password is below 8 characters', () => {
    renderWithProviders(<Register />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('REGISTER');

    fireEvent.changeText(passwordInput, '1234567');

    expect(
      screen.getByText('Password must be at least 8 characters'),
    ).toBeTruthy();
    expect(registerButton).toBeDisabled();
  });

  it('should throw an error & disabled button if confirm password is not the same as password', () => {
    renderWithProviders(<Register />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const registerButton = screen.getByText('REGISTER');

    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password1');

    expect(screen.getByText('Password does not match')).toBeTruthy();
    expect(registerButton).toBeDisabled();
  });

  it('should throw an error & disabled button if birthday is empty', () => {
    renderWithProviders(<Register />);

    const birthdayInput = screen.getByText('Please input your Birthday');
    const registerButton = screen.getByText('REGISTER');

    fireEvent.changeText(birthdayInput, '');

    expect(screen.getByText('Please input your Birthday')).toBeTruthy();
    expect(registerButton).toBeDisabled();
  });
});
