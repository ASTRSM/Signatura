import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import {color} from '../styles/variables';
import {Display2, Heading4} from '../components/typographies';
import CryptoJS from 'crypto-js';
import {STRING} from '@env';
import {useIsFocused} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const FrameContainer = styled.View`
  width: ${moderateScale(200)}px;
  height: ${moderateScale(200)}px;
  border-radius: 10px;
  border: 1px solid white;
`;

const Pill = styled.View`
  padding: ${moderateScale(6)}px ${moderateScale(24)}px;
  border-radius: 20px;
  background-color: ${color.danger};
`;

export default function Scan({navigation}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const devices = useCameraDevices();
  const device = devices?.back;
  const [result, setResult] = useState(null);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setErrorText(null);
      setResult(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (result) {
      navigation.navigate('ScanResult', {result});
    }
  }, [navigation, result]);

  useEffect(() => {
    try {
      const base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      const value = barcodes[0]?.displayValue ?? '';
      const isBase64 = base64regex.test(value);

      if (!isBase64) {
        throw new Error('Invalid QR Code');
      } else if (!value) {
        throw new Error('No QR Code detected');
      }

      const decryptedData = CryptoJS.AES.decrypt(value, STRING).toString(
        CryptoJS.enc.Utf8,
      );

      setResult(decryptedData);
    } catch (error) {
      setErrorText(error.message);

      if (error.message === 'malformed UTF-8 data') {
        navigation.navigate('ScanResult', {
          isValid: false,
          decryptedData: null,
        });
      }
    }
  }, [barcodes, navigation]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <Container>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <Display2 color={color.white}>Place the QR on the center</Display2>
        <FrameContainer />
        <Pill
          style={{
            visibility: errorText ? 'visible' : 'hidden',
            backgroundColor: errorText ? color.danger : 'transparent',
          }}>
          <Heading4 color={color.white}>{errorText}</Heading4>
        </Pill>
      </Container>
    )
  );
}
