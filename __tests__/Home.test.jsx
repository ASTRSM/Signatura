import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';

import Home from '../src/pages/Home';

describe('Home', () => {
  it('should renders correctly', () => {
    renderWithProviders(<Home />);

    expect(screen.findByText('Home')).toBeTruthy();
    expect(screen.findByText('Dashboard')).toBeTruthy();
  });
});