import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import ExchangeCard from '../components/ExchangeCard';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import Title from '../components/Titles';
import {Body2, Body5} from '../components/typographies';
import {color} from '../styles/variables';
import Signature, {SignatureTag} from '../components/Signature';
import ViewShot from 'react-native-view-shot';
import DetailButtons from '../components/DetailButtons';
import {ApproveModal} from '../components/modals';
import {
  useApproveSignatureMutation,
  useGetImageQuery,
  useGetSignatureQuery,
  useRejectSignatureMutation,
} from '../redux/slices/apiSlice';
import IconContainer from '../components/IconContainer';
import {FileSystem} from 'react-native-file-access';

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
  background-color: ${color.white};
`;

const Meta = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function Detail({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(null);
  const [errorText, setErrorText] = useState('');
  const {id, isRequestee} = route.params;
  const theme = isRequestee ? color.primary : color.secondary;
  const {
    data: signature,
    isFetching: loadingSignature,
    isUninitialized,
  } = useGetSignatureQuery(id);
  const {data: image} = useGetImageQuery(signature?.signee_id, {
    skip: !signature?.signee_id,
  });
  const ref = useRef();
  const overlay = useRef();
  const {width, height} = Dimensions.get('window');
  const [approveSignature] = useApproveSignatureMutation();
  const [rejectSignature] = useRejectSignatureMutation();

  useEffect(() => {
    if (!loadingSignature) {
      if (modalVisible) {
        overlay.current.setNativeProps({
          style: {height: height, width: width, transform: [{scale: 1}]},
        });
      } else {
        overlay.current.setNativeProps({
          style: {height: 0, width: 0, transform: [{scale: 0}]},
        });
      }
    }
  }, [height, loadingSignature, modalVisible, width]);

  const captureScreenshot = async () => {
    try {
      const uri = await ref.current.capture();
      const date = new Date().toDateString('gb-GB');
      await FileSystem.cpExternal(
        uri,
        `${signature?.signee_name}_signature_QR_${date}.png`,
        'downloads',
      );
      ToastAndroid.show('Signature Saved', ToastAndroid.LONG);
      setErrorText('');
    } catch (error) {
      setErrorText(error.toString());
    }
  };

  const handleApprove = async () => {
    try {
      await approveSignature({id: signature.id}).unwrap();
      ToastAndroid.show('Signature Sent', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    setModalVisible(null);
  };

  const handleReject = async (id, message) => {
    try {
      await rejectSignature({id, message}).unwrap();
      ToastAndroid.show('Signature Rejected', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    setModalVisible(null);
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme} />
      <Title title="Detail" lineColor={theme} />
      {loadingSignature || isUninitialized ? (
        <LoadingContainer>
          <IconContainer
            size={32}
            source={require('../../assets/images/Loading.gif')}
          />
        </LoadingContainer>
      ) : (
        <>
          <Meta>
            <Body2>{`#ID-${signature?.id.split('-')[0]}`}</Body2>
            <NoDocument>
              <Body2 color={theme}>No. Document</Body2>
              <Body5>{signature?.no_document || '-'}</Body5>
            </NoDocument>
          </Meta>
          <ExchangeCard
            signature={signature}
            navigation={navigation}
            isRequesteeProps={isRequestee}
            type="detail"
          />
          {signature?.status === 'done' ? (
            <ShotContainer>
              <ViewShot
                ref={ref}
                options={{
                  format: 'png',
                  quality: 1,
                  fileName: `TTD_${signature?.requestee}`,
                }}
                style={{maxWidth: 300, margin: 0}}>
                <Signature
                  id={signature?.id}
                  image={image?.publicUrl}
                  isRequestee={isRequestee}
                />
              </ViewShot>
              <SignatureTag
                id={signature?.id?.split('-')[0]}
                isRequestee={isRequestee}
              />
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
            status={signature?.status}
            isRequestee={isRequestee}
            setModalVisible={setModalVisible}
            image={image}
          />
          <ApproveModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleApprove={handleApprove}
            handleReject={handleReject}
            id={signature?.id}
          />
          <View ref={overlay} style={style.modalBackground} />
        </>
      )}
    </Container>
  );
}
