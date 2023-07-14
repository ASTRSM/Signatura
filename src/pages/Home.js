import React, {useMemo} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import KeyView from '../components/KeyView';
import {Title2} from '../components/Titles';
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
import {useGetDashboardQuery} from '../redux/slices/apiSlice';
import ExchangeCard from '../components/ExchangeCard';
import {useSelector} from 'react-redux';
import {NoData} from '../components/NoData';

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

export default function Home({navigation, route}) {
  const userId = useSelector(state => state.user?.id);
  const {data, error} = useGetDashboardQuery(userId, {
    skip: !userId,
  });

  const list = useMemo(() => data?.signatures || [], [data?.signatures]);

  const twoDigits = num => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  if (error) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <KeyView>
      <StatusBar backgroundColor={color.primary} />
      <HomeContainer>
        <Title2 title="Dashboard" />
        <DashboardContainer>
          <DashboardTop>
            <RequestPending
              onPress={() =>
                navigation.navigate('List', {
                  params: {status: 'pending', page: 'request', dashboard: true},
                  screen: 'ListScreen',
                })
              }
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <RequestPendingShape
                source={require('../../assets/images/DashboardShapeRed.png')}
              />
              <RequestPendingNumber color={color.white}>
                {twoDigits(data?.requesting)}
              </RequestPendingNumber>
              <Heading4 color={color.white}>Request Pending</Heading4>
            </RequestPending>
            <RequestSigned
              onPress={() =>
                navigation.navigate('List', {
                  params: {
                    status: 'done',
                    page: 'request',
                    dashboard: true,
                  },
                  screen: 'ListScreen',
                })
              }
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <Display5 color={color.primary}>
                {twoDigits(data?.signed)}
              </Display5>
              <Body8 color={color.primary}>Request Signed</Body8>
            </RequestSigned>
          </DashboardTop>
          <DashboardBottom
            onPress={() =>
              navigation.navigate('List', {
                params: {
                  status: 'pending',
                  page: 'sign',
                  dashboard: true,
                },
                screen: 'ListScreen',
              })
            }
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
            <Display5 color={color.white}>{twoDigits(data?.signing)}</Display5>
          </DashboardBottom>
        </DashboardContainer>
        <Title2 title="Latest Exchange" />
        {list.length > 0 ? (
          <ExchangeContainer>
            {list.map(item => (
              <ExchangeCard
                key={item.id}
                signature={item}
                userId={userId}
                navigation={navigation}
                type="list"
              />
            ))}
          </ExchangeContainer>
        ) : (
          <NoData />
        )}
      </HomeContainer>
    </KeyView>
  );
}
