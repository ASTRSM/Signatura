import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';
import Detail from '../src/pages/Detail';

describe('Detail Page', () => {
  it('should renders correctly', () => {
    jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

    const route = {
      params: {
        id: 1,
      },
    };

    renderWithProviders(<Detail route={route} />);

    expect(screen.findByText('Detail')).toBeTruthy();
    expect(screen.findByText('No. Document')).toBeTruthy();
  });
});
