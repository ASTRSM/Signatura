import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StatusBar, StyleSheet, View, Dimensions} from 'react-native';
import ExchangeCard from '../components/ExchangeCard';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import Title from '../components/Title';
import {Body2, Body5} from '../components/typographies';
import {color} from '../styles/variables';
import Signature from '../components/Signature';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {newestList} from '../helper/newestList';
import DetailButtons from '../components/DetailButtons';
import {ApproveModal} from '../components/modals';

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
  background-color: ${color.white};
`;

const Meta = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: ${moderateScale(32)}px;
`;

const NoDocument = styled.View`
  flex-direction: column;
`;

const ShotContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${moderateScale(32)}px;
`;

const NotAvailableContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: ${moderateScale(32)}px;
`;

const NotAvailable = styled.View`
  height: ${moderateScale(150)}px;
  width: ${moderateScale(200)}px;
  padding: ${moderateScale(12)}px;
  background-color: ${color.gray4};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default function Detail({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(null);
  const [errorText, setErrorText] = useState('');
  const {id} = route.params;
  const userId = 1;
  const detail = newestList.find(item => item.id === id);
  const isRequestee = userId === detail.requesteeId;
  const theme = isRequestee ? color.primary : color.secondary;
  const imageSource = require('../../assets/images/TTD.png');
  const ref = useRef();
  const overlay = useRef();
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    if (modalVisible) {
      overlay.current.setNativeProps({
        style: {height: height, width: width, transform: [{scale: 1}]},
      });
    } else {
      overlay.current.setNativeProps({
        style: {height: 0, width: 0, transform: [{scale: 0}]},
      });
    }
  }, [height, modalVisible, width]);

  const captureScreenshot = async () => {
    try {
      const uri = await ref.current.capture();
      const directory = `${RNFS.DocumentDirectoryPath}/signature.png`;

      await RNFS.copyFile(uri, directory);
      setErrorText('');
    } catch (error) {
      setErrorText(error.toString());
    }
  };

  const handleApprove = id => {
    console.log('approved', id);
    setModalVisible(null);
  };

  const handleReject = (id, message) => {
    console.log('rejected', id, message);
    setModalVisible(null);
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme} />
      <Title title="Detail" lineColor={theme} />
      <Meta>
        <Body2>{`#SGN-${detail.id}`}</Body2>
        <NoDocument>
          <Body2 color={theme}>No. Document</Body2>
          <Body5>{detail.no_document}</Body5>
        </NoDocument>
      </Meta>
      <ExchangeCard id={id} navigation={navigation} type="detail" />
      {detail.status === 'Done' ? (
        <ShotContainer>
          <ViewShot
            ref={ref}
            options={{
              format: 'png',
              quality: 1,
              fileName: `TTD_${detail.requestee}`,
            }}
            style={{maxWidth: 300, margin: 0}}>
            <Signature id={id} image={imageSource} isRequestee={isRequestee} />
          </ViewShot>
        </ShotContainer>
      ) : (
        <NotAvailableContainer>
          <NotAvailable>
            <Body2 color={color.gray3} style={{textAlign: 'center'}}>
              Signature will be available after the document is signed
            </Body2>
          </NotAvailable>
        </NotAvailableContainer>
      )}
      <Body2 color={color.danger}>{errorText}</Body2>
      <DetailButtons
        captureScreenshot={captureScreenshot}
        theme={theme}
        status={detail.status}
        isRequestee={isRequestee}
        setModalVisible={setModalVisible}
      />
      <ApproveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleApprove={handleApprove}
        handleReject={handleReject}
        id={id}
      />
      <View ref={overlay} style={style.modalBackground} />
    </Container>
  );
}
