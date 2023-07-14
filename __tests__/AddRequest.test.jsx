import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';

import AddRequest from '../src/pages/AddRequest';

describe('AddRequest', () => {
  it('should renders correctly', () => {
    renderWithProviders(<AddRequest />);

    expect(screen.findByText('Add Request')).toBeTruthy();
    expect(screen.findByText('Search')).toBeTruthy();
  });
})