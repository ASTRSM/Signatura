import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';

import Profile from '../src/pages/Profile';

describe('Profile', () => {
  it('should renders correctly', () => {
    renderWithProviders(<Profile />);

    expect(screen.findByText('Profile')).toBeTruthy();
    expect(screen.findByText('Edit')).toBeTruthy();
  });
});