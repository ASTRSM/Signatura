import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';
import List from '../src/pages/List';

describe('List Page', () => {
  it('should renders correctly', () => {
    renderWithProviders(<List />);

    expect(screen.findByText('Item List')).toBeTruthy();
    expect(screen.findByText('Request')).toBeTruthy();
    expect(screen.findByText('Sign')).toBeTruthy();
    expect(screen.findByText('Search')).toBeTruthy();
    expect(screen.findByText('Sort By')).toBeTruthy();
    expect(screen.findByText('Status')).toBeTruthy();
    expect(screen.findByText('Filter')).toBeTruthy();
    expect(screen.findByText('Sort')).toBeTruthy();
    expect(screen.findByText('Search')).toBeTruthy();
    expect(screen.findByText('Status')).toBeTruthy();
    expect(screen.findByText('Filter')).toBeTruthy();
  });
});
