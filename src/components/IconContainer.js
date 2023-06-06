import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';

const Icon = styled.Image`
  width: ${({size}) => moderateScale(size)}px;
  height: ${({size}) => moderateScale(size)}px;
`;

export default function IconContainer({source, size}) {
  return <Icon source={source} size={size} />;
}
