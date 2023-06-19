import React, {useRef, useState} from 'react';
import {StatusBar, Text, ToastAndroid, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ViewShot from 'react-native-view-shot';
import styled from 'styled-components/native';
import {Buttons} from '../components/DetailButtons';
import {SignatureOnly} from '../components/Signature';
import Title from '../components/Titles';
import {Body2, Body5, Display2, Display4} from '../components/typographies';
import {color} from '../styles/variables';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
  background-color: ${color.white};
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  gap: ${moderateScale(24)}px;
`;

const YLine = styled.View`
  width: ${moderateScale(2)}px;
  height: 100%;
  background-color: ${props => props.theme};
`;

const ProfileBody = styled.View`
  flex-direction: column;
  flex: 1;
  gap: ${moderateScale(8)}px;
`;

const ButtonsContainer = styled.View`
  flex-direction: column;
  gap: ${moderateScale(8)}px;
`;

const ButtonFs = styled.View`
  flex-direction: row;
  gap: ${moderateScale(8)}px;
`;

const ShotContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${moderateScale(32)}px;
`;

export default function Profile({navigation}) {
  const [errorText, setErrorText] = useState('');
  const theme = color.primary;
  const [newUri, setNewUri] = useState('');
  const ref = useRef();

  const captureScreenshot = async name => {
    try {
      const uri = await ref.current.capture();
      const directory = `${RNFS.DocumentDirectoryPath}/${name}_signature.png`;

      await RNFS.copyFile(uri, directory);
      setErrorText('');
      showToast('Signature saved');
    } catch (error) {
      setErrorText(error.toString());
    }
  };

  const pickImage = async () => {
    // const options = {
    //   mediaType: 'photo',
    //   includeBase64: false,
    //   maxHeight: 200,
    //   maxWidth: 200,
    // };
    // const result = await launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     setErrorText('User cancelled image picker');
    //   } else if (response.errorCode === 'camera_unavailable') {
    //     setErrorText('Camera not available on device');
    //   } else if (response.errorCode === 'permission') {
    //     setErrorText('Permission not satisfied');
    //   } else if (response.errorCode === 'others') {
    //     setErrorText(response.errorMessage);
    //   }
    // });

    const result = await ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    });

    console.log(result);

    if (result) {
      setNewUri(result.path);
      showToast('Signature changed');
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const profile = {
    id: '123',
    name: 'Dhafa Defrita Rama Yudistira',
    email: 'dhafa@gmail.com',
    birthday: Date.now() - 900000000000,
    institution: 'Universitas Gunadarma',
    description: 'Mahasiswa semester 8',
  };

  const date = new Date(profile.birthday).toLocaleDateString('en-GB');
  return (
    <Container>
      <StatusBar backgroundColor={theme} />
      <Title title="Detail" lineColor={theme} />
      <ProfileComponent
        id={profile.id}
        name={profile.name}
        email={profile.email}
        birthday={date}
        institution={profile.institution}
        description={profile.description}
        theme={theme}
      />
      <ShotContainer>
        <ViewShot
          ref={ref}
          options={{
            format: 'png',
            quality: 1,
          }}>
          <SignatureOnly
            image={
              newUri ? {uri: newUri} : require('../../assets/images/TTD.png')
            }
            id={profile.id}
            isRequestee={true}
          />
        </ViewShot>
      </ShotContainer>
      <Body2 color={color.danger}>{errorText}</Body2>
      <ButtonsContainer>
        <ButtonFs>
          <Buttons
            type="Change"
            theme={theme}
            fill={true}
            onPress={() => pickImage()}
          />
          <Buttons
            type="download"
            theme={theme}
            onPress={() => captureScreenshot(profile.name)}
          />
        </ButtonFs>
        <Buttons
          type="Edit Profile"
          theme={theme}
          onPress={() =>
            navigation.navigate('EditProfile', {...profile, edit: true})
          }
        />
      </ButtonsContainer>
    </Container>
  );
}

export const ProfileComponent = ({
  id,
  name,
  email,
  birthday,
  institution,
  description,
  theme,
}) => {
  return (
    <ProfileContainer>
      <YLine theme={theme} />
      <ProfileBody>
        <View>
          <Body2>{`#ID-${id}`}</Body2>
          <Display2>{name}</Display2>
          <Display4>{email}</Display4>
        </View>
        <View>
          <Body2 color={theme}>Birthday</Body2>
          <Body5>{birthday}</Body5>
        </View>
        <View>
          <Body2 color={theme}>Institution</Body2>
          <Body5>{institution}</Body5>
        </View>
        <View>
          <Body2 color={theme}>Description</Body2>
          <Body5>{description}</Body5>
        </View>
      </ProfileBody>
    </ProfileContainer>
  );
};
