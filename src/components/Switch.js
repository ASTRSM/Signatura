import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import {View} from 'react-native';
import {Heading2} from './typographies';
import IconContainer from './IconContainer';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${moderateScale(12)}px;
  margin: ${moderateScale(24)}px 0;
  align-items: center;
`;

const Pill = styled.Pressable`
  padding: ${moderateScale(3)}px;
  padding-left: ${moderateScale(12)}px;
  border-radius: 30px;
  background-color: ${props => (props.active ? props.theme : color.white)};
  border: 1px solid ${props => props.theme};
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export default function Switch({page, setPage, navigation}) {
  return (
    <Container>
      <Pill
        active={page === 'request'}
        onPress={() => setPage('request')}
        theme={color.primary}>
        <Heading2 color={page === 'request' ? color.white : color.primary}>
          Request
        </Heading2>
        <IconContainer
          size={24}
          source={require('../../assets/Icons/Doc.png')}
        />
      </Pill>
      <Pill
        active={page === 'sign'}
        onPress={() => setPage('sign')}
        theme={color.secondary}>
        <Heading2 color={page === 'sign' ? color.white : color.secondary}>
          Sign
        </Heading2>
        <IconContainer
          size={24}
          source={require('../../assets/Icons/Pen.png')}
        />
      </Pill>
    </Container>
  );
}
