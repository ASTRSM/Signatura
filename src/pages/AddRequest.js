import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Modal, Pressable, ScrollView, View} from 'react-native';
import KeyView from '../components/KeyView';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import Title, {Title2} from '../components/Titles';
import {Searchbar} from '../components/Filter';
import UserCard from '../components/UserCard';
import {ProfileComponent} from './Profile';
import {color} from '../styles/variables';
import {Input} from '../components/Input';
import {Buttons, ButtonsContainer} from '../components/DetailButtons';

const {height} = Dimensions.get('window');

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
`;

const ModalContainer = styled.View`
  background-color: ${color.white};
  padding: 0 ${moderateScale(24)}px;
  height: ${height}px;
  flex: 1;
`;

export default function AddRequest() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);
  const [noDocument, setNoDocument] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docDescription, setDocDescription] = useState('');

  const disabled = !docTitle;

  useEffect(() => {
    setNoDocument('');
    setDocTitle('');
    setDocDescription('');
  }, [modalVisible]);

  const handleSendRequest = useCallback(
    (noDocument, docTitle, docDescription) => {
      setModalVisible(null);
      console.log(noDocument, docTitle, docDescription);
    },
    [],
  );

  const userList = [
    {
      id: '1',
      name: 'John Doe',
      email: 'John@gmail.com',
      institution: 'PT Sarung Indonesia',
      birthday: (Date.now() - 800000000000).toString(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultrici',
    },
    {
      id: '2',
      name: 'Bob Doe',
      email: 'Bob@gmail.com',
      institution: 'Universitas Gaming',
      birthday: (Date.now() - 800000000000).toString(),
      description: '',
    },
    {
      id: '3',
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      institution: 'Universitas Bambang',
      birthday: (Date.now() - 800000000000).toString(),
      description: 'Lorem Ipsum dolor sit amet',
    },
  ];

  return (
    <KeyView>
      <Container>
        <Title title="Add Request" />
        <Title2 title="Choose User" />
        <Searchbar search={search} setSearch={setSearch} />
        <ScrollView>
          {userList.map((user, index) => (
            <UserCard
              key={index}
              id={user.id}
              name={user.name}
              email={user.email}
              institution={user.institution}
              onPress={() => {
                setChosenUser(user);
                setModalVisible(true);
              }}
            />
          ))}
        </ScrollView>
      </Container>
      <RequestModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chosenUser={chosenUser}
        setNoDocument={setNoDocument}
        setDocTitle={setDocTitle}
        setDocDescription={setDocDescription}
        noDocument={noDocument}
        docTitle={docTitle}
        docDescription={docDescription}
        disabled={disabled}
        handleSendRequest={handleSendRequest}
      />
    </KeyView>
  );
}

function RequestModal({
  modalVisible,
  setModalVisible,
  chosenUser,
  setNoDocument,
  setDocTitle,
  setDocDescription,
  noDocument,
  docTitle,
  docDescription,
  disabled,
  handleSendRequest,
}) {
  const theme = color.primary;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalVisible}
      onRequestClose={() => {
        setModalVisible(null);
      }}>
      <ScrollView>
        <ModalContainer>
          <Title2 title="Signee" color={theme} />
          <ProfileComponent
            id={chosenUser?.id}
            name={chosenUser?.name}
            email={chosenUser?.email}
            institution={chosenUser?.institution}
            birthday={chosenUser?.birthday}
            description={chosenUser?.description}
            theme={theme}
          />
          <Title2 title="Request" color={theme} />
          <Input
            type="No. Document"
            isImportant={false}
            setInput={setNoDocument}
            textInput={noDocument}
          />
          <Input
            type="Document Title"
            isImportant={true}
            setInput={setDocTitle}
            textInput={docTitle}
          />
          <Input
            type="Document Description"
            isImportant={false}
            setInput={setDocDescription}
            textInput={docDescription}
          />
          <Pressable
            disabled={disabled}
            onPress={() => {
              setModalVisible(null);
            }}
            text="Send Request"
          />
          <View>
            <ButtonsContainer>
              <Buttons
                theme={color.danger}
                onPress={() => setModalVisible(null)}
                type="cancel"
              />
              <Buttons
                theme={disabled ? color.gray3 : color.success}
                onPress={() =>
                  handleSendRequest(noDocument, docTitle, docDescription)
                }
                type="send"
                fill={true}
                disabled={disabled}
              />
            </ButtonsContainer>
          </View>
        </ModalContainer>
      </ScrollView>
    </Modal>
  );
}
