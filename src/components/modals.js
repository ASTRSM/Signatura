import React, {useState} from 'react';
import {View, Text, Pressable, Modal} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {capFirstLetter} from '../helper/capFirstLetter';
import {color} from '../styles/variables';
import {ModalButtons} from './DetailButtons';
import {Input} from './Input';
import {Display1} from './typographies';

const InvisibleHide = styled.Pressable`
  flex: 1;
  height: 100%;
`;

const Container = styled.View`
  background-color: ${color.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
`;

const Title = styled.View`
  flex-direction: row;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(12)}px;
`;

const Body = styled.View`
  padding: ${moderateScale(24)}px;
  margin-top: ${moderateScale(24)}px;
  margin-bottom: ${moderateScale(24)}px;
  justify-content: center;
  align-items: center;
`;

export function ApproveModal({
  modalVisible,
  setModalVisible,
  handleApprove,
  handleReject,
  id,
}) {
  const capitalized = capFirstLetter(modalVisible);
  const question =
    modalVisible === 'reject'
      ? 'Do you want to reject the request?'
      : 'Do you want to approve and send your TTD?';
  const theme = modalVisible === 'reject' ? color.danger : color.success;
  const [rejectMessage, setRejectMessage] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalVisible}
      onRequestClose={() => {
        setModalVisible(null);
      }}>
      <InvisibleHide onPress={() => setModalVisible(null)} />
      <Container>
        <Title color={theme}>
          <Display1 color={color.white}>{capitalized}</Display1>
        </Title>
        <Body>
          <Display1 color={color.gray1}>{question}</Display1>
          {modalVisible === 'reject' && (
            <Input
              type="Message (optional)"
              setInput={setRejectMessage}
              textInput={rejectMessage}
              isSecret={false}
            />
          )}
          <ModalButtons
            onCancel={() => setModalVisible(null)}
            onPressReject={() => handleReject(id, rejectMessage)}
            onPressApprove={() => handleApprove(id)}
            modalType={modalVisible}
          />
        </Body>
      </Container>
    </Modal>
  );
}
