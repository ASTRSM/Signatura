import React, {memo} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import IconContainer from './IconContainer';
import {Body3, Body6, Body7, Heading5} from './typographies';
import styled from 'styled-components/native';

const ExchangeCardContainer = styled.Pressable`
  border-radius: 12px;
  border: 1px solid ${props => props.color};
  flex-direction: ${props => (props.type === 'list' ? 'row' : 'column')}
  overflow: hidden;
  margin-bottom: ${moderateScale(12)}px;
  margin-top: ${props =>
    props.type === 'list' ? 0 : moderateScale(12) + 'px'};
`;

const LeftFlag = styled.View`
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
`;

const Detail = styled.View`
  padding: 12px;
  gap: ${moderateScale(6)}px;
  flex: ${props => (props.type === 'list' ? 1 : 'none')};
`;

const DetailDuo = styled.View`
  flex-direction: ${props => (props.type === 'list' ? 'row' : 'column-reverse')}
  justify-content: space-between;
  gap: ${moderateScale(6)}px;
`;

const Badge = styled.View`
  background-color: ${props => props.color};
  border-radius: 8px;
  padding: ${moderateScale(2)}px ${moderateScale(8)}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  max-width: ${props =>
    props.type === 'list' ? moderateScale(150) + 'px' : '100%'};
`;

export const Pill = styled(Badge)`
  max-width: ${props =>
    props.type === 'list' ? moderateScale(64) + 'px' : '100%'};
`;

export default memo(function ExchangeCard({
  navigation,
  type,
  userId,
  signature,
  isRequesteeProps = null,
}) {
  const date = new Date(signature?.updated_at).toLocaleDateString('id-ID');
  const isRequestee = isRequesteeProps
    ? isRequesteeProps
    : signature?.requestee_id === userId;
  const colorTheme = isRequestee ? color.primary : color.secondary;
  const icon = isRequestee
    ? require('../../assets/Icons/Doc.png')
    : require('../../assets/Icons/Pen.png');

  return (
    <ExchangeCardContainer
      onPress={() =>
        navigation.navigate('Detail', {id: signature?.id, isRequestee})
      }
      color={colorTheme}
      type={type}>
      <LeftFlag color={colorTheme}>
        <IconContainer source={icon} size={24} />
      </LeftFlag>
      <Detail type={type}>
        <DetailDuo type={type}>
          <Heading5 color={colorTheme} numberOfLines={type === 'list' ? 1 : 0}>
            {signature?.title}
          </Heading5>
          <Body7 color={color.gray1}>{date}</Body7>
        </DetailDuo>
        <Body6 color={color.gray1} numberOfLines={type === 'list' ? 1 : 0}>
          {signature?.description || '-'}
        </Body6>
        <DetailDuo type={type}>
          <Badge color={colorTheme} type={type}>
            <Body3 color={color.white} numberOfLines={1}>
              {isRequestee ? 'From:' : 'To:'}{' '}
              <Body6 color={color.white}>
                {isRequestee
                  ? signature?.signee_name
                  : signature?.requestee_name}
              </Body6>
            </Body3>
          </Badge>
          <Pill
            color={
              signature?.status === 'pending'
                ? color.warning
                : signature?.status === 'done'
                ? color.success
                : color.danger
            }>
            <Body3 color={color.white}>
              {signature?.status[0].toUpperCase() + signature?.status.slice(1)}
              {signature?.message &&
                type === 'detail' &&
                `: ${signature?.message}`}
            </Body3>
          </Pill>
        </DetailDuo>
      </Detail>
    </ExchangeCardContainer>
  );
});
