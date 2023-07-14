import React, {memo} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import {Body2, Body5, Body9, Heading4} from './typographies';
import styled from 'styled-components/native';
import {Pill} from './ExchangeCard';

const UserCardContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(12)}px;
  border-bottom: 1px solid ${color.gray5};
  padding: ${moderateScale(12)}px 0;
`;

const Yline = styled.View`
  width: 3px;
  height: 100%;
  background-color: ${color.primary};
`;

const UserCardBody = styled.View`
  gap: ${moderateScale(4)}px;
  flex: 1;
`;

const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserCard = memo(({id, name, email, institution, onPress}) => {
  return (
    <UserCardContainer onPress={onPress}>
      <Yline />
      <UserCardBody>
        <Heading4>{name}</Heading4>
        <Body9>{email}</Body9>
        <Bottom>
          <Body2>{`#ID-${id}`}</Body2>
          <Pill color={color.primary}>
            <Body5 color={color.white}>{institution}</Body5>
          </Pill>
        </Bottom>
      </UserCardBody>
    </UserCardContainer>
  );
});

export default UserCard;
