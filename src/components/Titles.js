import React from 'react';
import {Heading1, Heading2} from './typographies';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(6)}px;
  margin: ${moderateScale(20)}px 0px ${moderateScale(32)}px 0;
`;

const XLine = styled.View`
  width: 100%;
  height: 3px;
  background-color: ${props => props.color || color.primary};
  width: ${moderateScale(100)}px;
`;

const Title2container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0px 10px 0;
`;

const Header = styled(Heading2)`
  color: ${color.gray1};
`;

const YLine = styled.View`
  width: 3px;
  height: 100%;
  background-color: ${color.primary};
  margin-right: 10px;
`;

export default function Title({title, lineColor}) {
  return (
    <Container>
      <Heading1>{title}</Heading1>
      <XLine color={lineColor} />
    </Container>
  );
}

export function Title2({title}) {
  return (
    <Title2container>
      <YLine />
      <Header>{title}</Header>
    </Title2container>
  );
}