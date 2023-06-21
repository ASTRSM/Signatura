import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import IconContainer from '../components/IconContainer';
import {
  Body2,
  Body5,
  Display1,
  Heading2,
  Heading3,
  Heading4,
} from '../components/typographies';
import {color} from '../styles/variables';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import Signature from '../components/Signature';
import {newestList} from '../helper/newestList';

// const {width} = Dimensions.get('window');
// const ratio = width / 750;

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

export default function ScanResult({navigation, route}) {
  const {isValid, decryptedData} = route.params;
  const theme = isValid ? color.success : color.danger;
  const imageSource = require('../../assets/images/TTD.png');

  const data = newestList.find(item => item.id === Number(decryptedData));

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Header color={theme}>
          <IconContainer
            source={require('../../assets/Icons/Check.png')}
            size={50}
          />
          <Display1 color={color.white}>
            {isValid ? 'Success' : 'Error'}
          </Display1>
        </Header>
        {isValid ? (
          <Success
            decryptedData={decryptedData}
            imageSource={imageSource}
            data={data}
          />
        ) : (
          <ErrorContainer>
            <ErrorBody>
              <Heading2 color={color.danger}>Invalid QR Code</Heading2>
              <Body5>
                The QR Code you scanned is invalid. Please try again.
              </Body5>
              <RetryButton onPress={() => navigation.goBack()}>
                <IconContainer
                  source={require('../../assets/Icons/Refresh.png')}
                  size={24}
                />
              </RetryButton>
            </ErrorBody>
          </ErrorContainer>
        )}
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

function Success({decryptedData, imageSource, data}) {
  return (
    <ScrollView>
      <TicketContainer>
        <TicketEdge source={require('../../assets/images/TicketEdge.png')} />
        <Top>
          <Signature id={decryptedData} image={imageSource} />
        </Top>
        <TicketMiddle
          source={require('../../assets/images/TicketMiddle.png')}
        />
        <Body>
          <Data title="Signee" text={data?.signee} id={data?.signeeId} />
          <Data
            title="Requestee"
            text={data?.requestee}
            id={data?.requesteeId}
          />
          <Data title="Date" text={data?.date} />
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
