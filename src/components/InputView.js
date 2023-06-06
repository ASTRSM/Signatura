import React from 'react';
import styled from 'styled-components/native';
import {color} from '../styles/variables';

const StyledInputView = styled.View`
  background-color: ${color.gray4};
  border-radius: 16px;
  width: 100%;
  padding: 6px 16px 6px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: ${props =>
    props.error ? '1px solid ' + color.danger : '1px solid ' + color.gray4};
`;

export default function InputView({children, error = ''}) {
  return <StyledInputView error={error}>{children}</StyledInputView>;
}
