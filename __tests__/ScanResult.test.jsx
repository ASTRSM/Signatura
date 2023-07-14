import 'react-native';
import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../src/redux/renderWithProviders';

import ScanResult from '../src/pages/ScanResult';

describe('ScanResult', () => {
  it('should renders correctly', () => {
    renderWithProviders(<ScanResult route={{params: {}}}/>);
  });
});