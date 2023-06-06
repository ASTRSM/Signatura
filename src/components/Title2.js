import {color} from '../styles/variables';
import {Heading2} from './typographies';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
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

export default function Title2({title}) {
  return (
    <Container>
      <YLine />
      <Header>{title}</Header>
    </Container>
  );
}
