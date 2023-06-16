import React from 'react';
import {Heading1} from './typographies';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(6)}px;
  margin: ${moderateScale(20)}px 0px ${moderateScale(10)}px 0;
`;

const XLine = styled.View`
  width: 100%;
  height: 3px;
  background-color: ${props => props.color || color.primary};
  width: ${moderateScale(100)}px;
`;

export default function Title({title, lineColor}) {
  return (
    <Container>
      <Heading1>{title}</Heading1>
      <XLine color={lineColor} />
    </Container>
  );
}
