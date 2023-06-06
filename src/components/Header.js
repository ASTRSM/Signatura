import React from 'react';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Heading2} from './typographies';

const HeaderView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 9px;
`;

const Line = styled.View`
  height: 100%;
  width: 3px;
  background-color: ${color.secondary};
`;

const Heading = styled(Heading2)`
  color: ${color.white};
  margin-left: 12px;
`;

export default function Header({children}) {
  return (
    <HeaderView>
      <Line />
      <Heading numberOfLines={1}>Welcome, {children}</Heading>
    </HeaderView>
  );
}
