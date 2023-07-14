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

const QRContainer = styled.View`
  border: 3px solid ${props => props.theme};
`;

const XLine = styled.View`
  height: 4px;
  width: ${moderateScale(100)}px;
  background-color: ${props => props.color};
  margin-top: ${moderateScale(6)}px;
  margin-bottom: ${moderateScale(2)}px;
`;

export default function Signature({image, id, isRequestee = true}) {
  const QRValue = CryptoJS.AES.encrypt(id.toString(), STRING).toString();
  const uniqueUrl = `${image}?${new Date()}`;
  return (
    <ImageContainer>
      <SignatureContainer>
        {image && <SignatureImage source={{uri: uniqueUrl}} />}
        <QRContainer theme={isRequestee ? color.primary : color.secondary}>
          <QRCode value={QRValue} size={moderateScale(100)} />
        </QRContainer>
      </SignatureContainer>
    </ImageContainer>
  );
}

export const SignatureOnly = ({image}) => {
  const uniqueUrl = `${image}?${new Date()}`;
  return (
    <ImageContainer>
      <SignatureImage source={{uri: uniqueUrl}} />
    </ImageContainer>
  );
};

export const SignatureTag = ({id, isRequestee}) => {
  return (
    <>
      <XLine color={isRequestee ? color.primary : color.secondary} />
      <Body2>{`#ID-${id}`}</Body2>
    </>
  );
};
