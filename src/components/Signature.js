import QRCode from 'react-native-qrcode-svg';
import {STRING} from '@env';
import CryptoJS from 'crypto-js';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {Body2} from './typographies';
import {color} from '../styles/variables';

const ImageContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignatureContainer = styled.View`
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: -20px;
`;

const SignatureImage = styled.Image`
  width: ${moderateScale(150)}px;
  height: ${moderateScale(150)}px;
  object-fit: contain;
`;

const XLine = styled.View`
  height: 4px;
  width: ${moderateScale(100)}px;
  background-color: ${props => props.color};
  margin-top: ${moderateScale(6)}px;
  margin-bottom: ${moderateScale(2)}px;
`;

export default function Signature({image, id, isRequestee}) {
  const QRValue = CryptoJS.AES.encrypt(id.toString(), STRING).toString();

  return (
    <ImageContainer>
      <SignatureContainer>
        <SignatureImage source={image} />
        <QRCode value={QRValue} size={moderateScale(100)} />
      </SignatureContainer>
      <XLine color={isRequestee ? color.primary : color.secondary} />
      <Body2>{`#SGN-${id}`}</Body2>
    </ImageContainer>
  );
}

export const SignatureOnly = ({image, id, isRequestee}) => {
  return (
    <ImageContainer>
      <SignatureImage source={image} />
      <XLine color={isRequestee ? color.primary : color.secondary} />
      <Body2>{`#SGN-${id}`}</Body2>
    </ImageContainer>
  );
};
