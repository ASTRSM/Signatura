import React, {memo} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import IconContainer from './IconContainer';
import {Body3, Body6, Body7, Heading5} from './typographies';
import styled from 'styled-components/native';

const newestList = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    signeeId: 1,
    signee: 'John Doe',
    requesteeId: 4,
    requestee: 'Manuel Neuer',
    date: '17/12/2023',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    signeeId: 2,
    signee: 'Mark Zuckerberg',
    requesteeId: 1,
    requestee: 'John Doe',
    date: '17/12/2023',
    status: 'Done',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    signeeId: 1,
    signee: 'John Doe',
    requesteeId: 3,
    requestee: 'Gaming Chair nigger nigger nigger nigger nigger',
    date: '17/12/2023',
    status: 'Rejected',
  },
];

const ExchangeCardContainer = styled.Pressable`
  border-radius: 12px;
  border: 1px solid ${props => props.color};
  flex-direction: row;
  overflow: hidden;
  margin-bottom: ${moderateScale(12)}px;
`;

const LeftFlag = styled.View`
  background-color: ${props => props.color};
  justify-content: center;
`;

const Detail = styled.View`
  padding: 12px;
  gap: ${moderateScale(6)}px;
  flex: 1;
`;

const DetailDuo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Badge = styled.View`
  background-color: ${props => props.color};
  border-radius: 8px;
  padding: ${moderateScale(2)}px ${moderateScale(8)}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  max-width: ${moderateScale(150)}px;
`;

const Pill = styled(Badge)`
  min-width: ${moderateScale(64)}px;
`;

export default memo(function ExchangeCard({id, navigation}) {
  const userId = 1;
  const {
    title,
    description,
    signeeId,
    signee,
    requesteeId,
    requestee,
    date,
    status,
  } = newestList.find(item => item.id === id);
  const isRequestee = userId === requesteeId;
  const colorTheme = isRequestee ? color.primary : color.secondary;
  const icon = isRequestee
    ? require('../../assets/Icons/Doc.png')
    : require('../../assets/Icons/Pen.png');

  return (
    <ExchangeCardContainer
      onPress={() => navigation.navigate('Detail', {id: id})}
      color={colorTheme}>
      <LeftFlag color={colorTheme}>
        <IconContainer source={icon} size={24} />
      </LeftFlag>
      <Detail>
        <DetailDuo>
          <Heading5 color={colorTheme} numberOfLines={1}>
            {title}
          </Heading5>
          <Body7 color={color.gray1}>{date}</Body7>
        </DetailDuo>
        <Body6 color={color.gray1} numberOfLines={1}>
          {description}
        </Body6>
        <DetailDuo>
          <Badge color={colorTheme}>
            <Body3 color={color.white} numberOfLines={1}>
              {isRequestee ? 'From:' : 'To:'}{' '}
              <Body6 color={color.white}>
                {isRequestee ? signee : requestee}
              </Body6>
            </Body3>
          </Badge>
          <Pill
            color={
              status === 'Pending'
                ? color.warning
                : status === 'Done'
                ? color.success
                : color.danger
            }>
            <Body3 color={color.white}>{status}</Body3>
          </Pill>
        </DetailDuo>
      </Detail>
    </ExchangeCardContainer>
  );
});
