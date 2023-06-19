import React from 'react';
import {Button, ScrollView, StatusBar, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import KeyView from '../components/KeyView';
import {Title2} from '../components/Titles';
import {logoutExample} from '../redux/slices/authSlice';
import styled from 'styled-components/native';
import {
  Body8,
  Display5,
  Display6,
  Heading2,
  Heading4,
} from '../components/typographies';
import {color} from '../styles/variables';
import {moderateVerticalScale, moderateScale} from 'react-native-size-matters';
import ExchangeCard from '../components/ExchangeCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {newestList} from '../helper/newestList';

const HomeContainer = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
`;

const DashboardContainer = styled.View`
  justify-content: space-between;
  flex-direction: column;
  gap: ${moderateScale(12)}px;
`;

const DashboardTop = styled.View`
  flex-direction: row;
  gap: ${moderateScale(12)}px;
`;

const DashboardBottom = styled.Pressable`
  background-color: ${color.secondary};
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(16)}px;
`;

const DashboardBottomShape = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  width: ${moderateScale(287 / 1.5)}px;
  height: ${moderateVerticalScale(168 / 1.5)}px;
`;

const DashboardBottomText = styled(Display6)`
  max-width: 40%;
`;

const RequestPending = styled.Pressable`
  flex-direction: row;
  background-color: ${color.primary};
  padding: ${moderateScale(16)}px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  flex: 1;
`;

const RequestPendingNumber = styled(Display5)`
  margin-right: ${moderateScale(12)}px;
`;

const RequestPendingShape = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
`;

const RequestSigned = styled.Pressable`
  border-radius: 12px;
  border: 1px solid ${color.primary};
  padding: ${moderateScale(16)}px;
  justify-content: center;
  align-items: center;
`;

const ExchangeContainer = styled.ScrollView`
  gap: ${moderateScale(12)}px;
`;

const dashboardExample = {
  pending: '01',
  signed: '08',
  toSign: '04',
};

export default function Home({navigation}) {
  return (
    <KeyView>
      <StatusBar backgroundColor={color.primary} />
      <HomeContainer>
        <Title2 title="Dashboard" />
        <DashboardContainer>
          <DashboardTop>
            <RequestPending
              onPress={() => navigation.navigate('List')}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <RequestPendingShape
                source={require('../../assets/images/DashboardShapeRed.png')}
              />
              <RequestPendingNumber color={color.white}>
                {dashboardExample.pending}
              </RequestPendingNumber>
              <Heading4 color={color.white}>Request Pending</Heading4>
            </RequestPending>
            <RequestSigned
              onPress={() => navigation.navigate('List')}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <Display5 color={color.primary}>
                {dashboardExample.signed}
              </Display5>
              <Body8 color={color.primary}>Request Signed</Body8>
            </RequestSigned>
          </DashboardTop>
          <DashboardBottom
            onPress={() => navigation.navigate('List')}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <DashboardBottomShape
              source={require('../../assets/images/DashboardShapeBlue.png')}
            />
            <DashboardBottomText color={color.white}>
              Document You have to
              <Heading2 color={color.white}> Sign</Heading2>
            </DashboardBottomText>
            <Display5 color={color.white}>{dashboardExample.toSign}</Display5>
          </DashboardBottom>
        </DashboardContainer>
        <Title2 title="Latest Exchange" />
        <ExchangeContainer>
          {newestList.map(item => (
            <ExchangeCard
              key={item.id}
              id={item.id}
              navigation={navigation}
              type="list"
            />
          ))}
        </ExchangeContainer>
      </HomeContainer>
    </KeyView>
  );
}
