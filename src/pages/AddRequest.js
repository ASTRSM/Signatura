import React, {memo, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
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
import {
  useAddSignatureMutation,
  useGetUserQuery,
  useGetUsersQuery,
} from '../redux/slices/apiSlice';
import {useDebounce} from '@uidotdev/usehooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Body2} from '../components/typographies';

const {height} = Dimensions.get('window');

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
`;

const ModalContainer = styled.View`
  background-color: ${color.white};
  padding: ${moderateScale(24)}px;
  height: ${height}px;
  flex: 1;
`;

const NoDataText = styled(Body2)`
  color: ${color.gray3};
  flex: 1;
  text-align: center;
  justify-content: center;
  padding: ${moderateScale(24)}px;
`;

export default function AddRequest({navigation}) {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const debounchSearch = useDebounce(search, 1000);
  const userId = useSelector(state => state.user?.id);

  const {data: userList} = useGetUsersQuery(
    {
      keyword: debounchSearch,
      id: userId,
    },
    {
      skip: !debounchSearch && !userId,
    },
  );

  const memoizedUserList = useMemo(() => userList || [], [userList]);

  return (
    <KeyView>
      <Container>
        <Title title="Add Request" />
        <Title2 title="Choose User" />
        <Searchbar
          search={search}
          setSearch={setSearch}
          debounchSearch={debounchSearch}
        />
        <ScrollView>
          {memoizedUserList?.length ? (
            memoizedUserList.map((user, index) => (
              <UserCard
                key={index}
                id={user?.id.split('-')[0]}
                name={user?.name}
                email={user?.email}
                institution={user?.institution || 'No Institution'}
                onPress={() => {
                  setChosenUser(user);
                  setModalVisible(true);
                }}
              />
            ))
          ) : (
            <NoDataText>No Data</NoDataText>
          )}
        </ScrollView>
      </Container>
      <RequestModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chosenUserId={chosenUser?.id}
        disabled={disabled}
        setDisabled={setDisabled}
        navigation={navigation}
      />
    </KeyView>
  );
}

const RequestModal = memo(
  ({
    modalVisible,
    setModalVisible,
    chosenUserId,
    disabled,
    setDisabled,
    navigation,
  }) => {
    const [noDocument, setNoDocument] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addSignature] = useAddSignatureMutation();
    const {data: chosenUser} = useGetUserQuery(chosenUserId, {
      skip: !chosenUserId,
    });
    useEffect(() => {
      if (title) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [title, setDisabled]);

    useEffect(() => {
      setNoDocument('');
      setTitle('');
      setDescription('');
    }, [modalVisible]);

    const handleSendRequest = async () => {
      const session = await AsyncStorage.getItem('session');
      const requestee = JSON.parse(session)?.user.id;
      const signee = chosenUser?.id;
      try {
        await addSignature({
          noDocument,
          title,
          description,
          requestee,
          signee,
        }).unwrap();
        setModalVisible(null);
        navigation.goBack();
        ToastAndroid.show('Request Sent', ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    };

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
              id={chosenUser?.id.split('-')[0]}
              name={chosenUser?.name}
              email={chosenUser?.email}
              institution={chosenUser?.institution || '-'}
              birthday={chosenUser?.birthday}
              description={chosenUser?.description || '-'}
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
              setInput={setTitle}
              textInput={title}
            />
            <Input
              type="Document Description"
              isImportant={false}
              setInput={setDescription}
              textInput={description}
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
                    handleSendRequest(noDocument, title, description)
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
  },
);
