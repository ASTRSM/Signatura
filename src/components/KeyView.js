import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../styles/variables';

const CustomView = styled.KeyboardAvoidingView`
  background-color: ${color.white};
  flex: 1;
`;

export default function KeyView({children}) {
  return (
    <CustomView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </CustomView>
  );
}
