import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import IconContainer from '../components/IconContainer';
import {Body2, Body5, Display1, Heading2} from '../components/typographies';
import {color} from '../styles/variables';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import Signature, {SignatureTag} from '../components/Signature';
import {useGetImageQuery, useGetSignatureQuery} from '../redux/slices/apiSlice';

const Container = styled.View`
  flex: 1;
  background-color: ${color.white};
`;

const Header = styled.View`
  background-color: ${props => props.color};
  padding: ${moderateScale(6)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const TicketContainer = styled.View`
  align-items: center;
  margin: ${moderateScale(24)}px;
  justify-content: center;
`;

const TicketEdge = styled.Image`
  width: 100%;
  height: auto;
  aspect-ratio: 744 / 67;
`;

const TicketEdgeBottom = styled(TicketEdge)`
  transform: rotate(180deg);
`;

const TicketMiddle = styled.Image`
  width: 100%;
  height: auto;
  aspect-ratio: 744 / 67;
`;

const Top = styled.View`
  background-color: ${color.white};
  width: 100%;
  padding: ${moderateScale(24)}px;
  align-items: center;
  justify-content: center;
`;

const Body = styled.View`
  background-color: ${color.white};
  width: 100%;
  padding: ${moderateScale(24)}px;
  justify-content: center;
  gap: 12px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorBody = styled.View`
  background-color: ${color.white};
  padding: ${moderateScale(24)}px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
`;

const RetryButton = styled.Pressable`
  background-color: ${color.white};
  width: 100%;
  padding: ${moderateScale(12)}px;
  border-radius: 12px;
  border: 1px solid ${color.primary};
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingBody = styled.View`
  background-color: ${color.white};
  padding: ${moderateScale(24)}px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

export default function ScanResult({navigation, route}) {
  const {result} = route.params;
  const {data} = useGetSignatureQuery(result, {
    skip: !result,
  });
  const theme = result ? color.success : color.danger;
  const {
    data: image,
    isSuccess,
    isError,
    isLoading,
    error,
    isUninitialized,
  } = useGetImageQuery(data?.signee_id, {
    skip: !data,
  });

  const status = () => {
    if (isUninitialized || isLoading) {
      return 'Loading...';
    } else if (isError) {
      return 'Error';
    } else if (isSuccess) {
      return 'Success';
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Header color={isLoading || isUninitialized ? color.gray3 : theme}>
          <IconContainer
            source={require('../../assets/Icons/Check.png')}
            size={50}
          />
          <Display1 color={color.white}>{status()}</Display1>
        </Header>
        {!isUninitialized && !isLoading && isSuccess ? (
          <Success
            data={data}
            imageSource={image?.publicUrl}
            navigation={navigation}
            isLoading={isLoading}
          />
        ) : (
          <Loading />
        )}
        {isError || error ? (
          <Error error={error} navigation={navigation} />
        ) : null}
      </ImageBackground>
    </Container>
  );
}

function Data({title, text, id = ''}) {
  return (
    <View>
      <Body2 color={color.primary}>{title}</Body2>
      <Body5>
        {text}
        {id && <Body2 bold>{` (#ID-${id})`}</Body2>}
      </Body5>
    </View>
  );
}

function Success({data, imageSource, isLoading}) {
  return (
    <ScrollView>
      <TicketContainer>
        <TicketEdge source={require('../../assets/images/TicketEdge.png')} />
        <Top>
          <Signature id={data?.id} image={imageSource} />
          <SignatureTag id={data?.id?.split('-')[0]} isRequestee={true} />
        </Top>
        <TicketMiddle
          source={require('../../assets/images/TicketMiddle.png')}
        />
        <Body>
          <Data
            title="Signee"
            text={data?.signee_name}
            id={data?.signee_id.split('-')[0]}
          />
          <Data
            title="Requestee"
            text={data?.requestee_name}
            id={data?.requestee_id.split('-')[0]}
          />
          <Data
            title="Date"
            text={new Date(data?.updated_at).toDateString('gb-GB')}
          />
          <Data title="No. Document" text={data?.no_document} />
          <Data title="Document Title" text={data?.title} />
          <Data title="Document Description" text={data?.description} />
        </Body>
        <TicketEdgeBottom
          source={require('../../assets/images/TicketEdge.png')}
        />
      </TicketContainer>
    </ScrollView>
  );
}

function Loading() {
  return (
    <LoadingContainer>
      <LoadingBody>
        <IconContainer
          size={32}
          source={require('../../assets/images/Loading.gif')}
        />
      </LoadingBody>
    </LoadingContainer>
  );
}

function Error({error, navigation}) {
  return (
    <ErrorContainer>
      <ErrorBody>
        <Heading2 color={color.danger}>Invalid QR Code</Heading2>
        <Body5>
          {error
            ? error?.message
            : 'The QR Code you scanned is invalid. Please try again.'}
        </Body5>
        <RetryButton onPress={() => navigation.goBack()}>
          <IconContainer
            source={require('../../assets/Icons/Refresh.png')}
            size={24}
          />
        </RetryButton>
      </ErrorBody>
    </ErrorContainer>
  );
}
