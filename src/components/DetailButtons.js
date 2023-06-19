import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import {DownloadIcon} from '../components/IconContainer';
import {Display2, Display3} from '../components/typographies';
import {color} from '../styles/variables';
import {capFirstLetter} from '../helper/capFirstLetter';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${moderateScale(24)}px;
  gap: ${moderateScale(12)}px;
`;

const Button = styled.Pressable`
  flex: 1;
  padding: ${moderateScale(12)}px;
  gap: ${moderateScale(6)}px;
  border-radius: 10px;
  flex-direction: row;
  min-width: ${moderateScale(100)}px;
  min-height: ${moderateScale(45)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme};
  background-color: ${props => (props.fill ? props.theme : color.white)};
`;

export default function DetailButtons({
  captureScreenshot,
  theme,
  status,
  isRequestee,
  setModalVisible,
}) {
  return (
    <ButtonsContainer>
      {status === 'Done' && (
        <Buttons theme={theme} onPress={captureScreenshot} type="download" />
      )}
      {status !== 'Done' && isRequestee && (
        <Buttons theme={color.gray3} type="download" disabled={true} />
      )}
      {status === 'Pending' && !isRequestee && (
        <Buttons
          theme={color.danger}
          onPress={() => setModalVisible('reject')}
          type="reject"
        />
      )}
      {status === 'Pending' && !isRequestee && (
        <Buttons
          theme={color.success}
          onPress={() => setModalVisible('approve')}
          type="approve"
          fill={true}
        />
      )}
      {status === 'Rejected' && !isRequestee && (
        <Buttons theme={color.gray3} type="reject" disabled={true} />
      )}
      {status === 'Rejected' && !isRequestee && (
        <Buttons
          theme={color.success}
          onPress={() => setModalVisible('approve')}
          type="approve"
          fill={true}
        />
      )}
    </ButtonsContainer>
  );
}

export function ModalButtons({
  onCancel,
  onPressApprove,
  onPressReject,
  modalType,
}) {
  return (
    <ButtonsContainer>
      <Buttons theme={color.danger} onPress={onCancel} type="Cancel" />
      <Buttons
        theme={color.success}
        onPress={modalType === 'reject' ? onPressReject : onPressApprove}
        type="Yes"
        fill={true}
      />
    </ButtonsContainer>
  );
}

export const Buttons = ({theme, onPress, type, fill, disabled = false}) => {
  const capitalizedType = capFirstLetter(type);
  return (
    <Button theme={theme} onPress={onPress} fill={fill} disabled={disabled}>
      {fill ? (
        <Display2 color={fill ? color.white : theme}>
          {capitalizedType}
        </Display2>
      ) : (
        <Display3 color={fill ? color.white : theme}>
          {capitalizedType}
        </Display3>
      )}
      {type === 'download' && <DownloadIcon size={24} color={theme} />}
    </Button>
  );
};
