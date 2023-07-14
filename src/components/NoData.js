import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import {Display2, Display5} from './typographies';

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${moderateScale(8)}px;
`;

export const NoData = ({keyboardShown = false}) => {
  return (
    <ErrorContainer>
      {!keyboardShown && <Display5 color={color.gray3}>¯\_(ツ)_/¯</Display5>}
      <Display2 color={color.gray2}>No data found or made yet</Display2>
    </ErrorContainer>
  );
};
