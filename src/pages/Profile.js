import React, {useRef, useState} from 'react';
import {ScrollView, StatusBar, ToastAndroid, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ViewShot from 'react-native-view-shot';
import styled from 'styled-components/native';
import {Buttons, SmallButtons} from '../components/DetailButtons';
import {SignatureOnly, SignatureTag} from '../components/Signature';
import Title from '../components/Titles';
import {Body2, Body5, Display2, Display4} from '../components/typographies';
import {color} from '../styles/variables';
import {FileSystem} from 'react-native-file-access';
import {
  useAddImageMutation,
  useGetImageQuery,
  useSignOutMutation,
} from '../redux/slices/apiSlice';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

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

const NotAvailableContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: ${moderateScale(32)}px;
`;

const NotAvailable = styled.View`
  height: ${moderateScale(150)}px;
  width: ${moderateScale(150)}px;
  padding: ${moderateScale(12)}px;
  background-color: ${color.gray4};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export default function Profile({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const theme = color.primary;
  const ref = useRef();
  const [signOut] = useSignOutMutation();
  const profile = useSelector(state => state.user);
  const [addImage] = useAddImageMutation();
  const {data: image} = useGetImageQuery(profile.id, {
    skip: !profile.id,
  });

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    }
  };

  const captureScreenshot = async name => {
    try {
      const uri = await ref.current.capture();

      await FileSystem.cpExternal(uri, `${name}_signature.png`, 'downloads');
      setErrorText('');
      showToast('Signature saved');
    } catch (error) {
      setErrorText(error.toString());
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 500,
      maxWidth: 500,
    };
    setIsLoading(true);
    const result = await launchImageLibrary(options, response => {
      if (response.errorCode === 'camera_unavailable') {
        setErrorText('Camera not available on device');
      } else if (response.errorCode === 'permission') {
        setErrorText('Permission not satisfied');
      } else if (response.errorCode === 'others') {
        setErrorText(response.errorMessage);
      }
    });

    if (!result.didCancel) {
      try {
        await addImage({
          id: profile.id,
          base64: result.assets[0].base64,
        }).unwrap();
        setIsLoading(false);
        showToast('Signature changed');
      } catch (error) {
        showToast(error.message);
        setIsLoading(false);
      }
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const date = new Date(profile.birthday).toLocaleDateString('en-GB');
  return (
    <Container>
      <ScrollView>
        <StatusBar backgroundColor={theme} />
        <Title title="Profile" lineColor={theme} />
        <ProfileComponent
          id={profile.id}
          name={profile.name}
          email={profile.email}
          birthday={date}
          institution={profile.institution}
          description={profile.description}
          theme={theme}
          navigation={navigation}
          profile={profile}
        />
        {image ? (
          <ShotContainer>
            <ViewShot
              ref={ref}
              options={{
                format: 'png',
                quality: 1,
              }}>
              <SignatureOnly image={image?.publicUrl} />
            </ViewShot>
            <SignatureTag id={profile?.id?.split('-')[0]} isRequestee={true} />
          </ShotContainer>
        ) : (
          <NotAvailableContainer>
            <NotAvailable>
              <Display4>Signature is not available yet</Display4>
            </NotAvailable>
          </NotAvailableContainer>
        )}
        <Body2 color={color.danger}>{errorText}</Body2>
        <ButtonsContainer>
          <ButtonFs>
            <Buttons
              type={image ? 'change' : 'add Signature +'}
              theme={theme}
              fill={true}
              onPress={() => pickImage()}
            />
            {image && (
              <Buttons
                type="download"
                theme={theme}
                onPress={() => captureScreenshot(profile.name)}
                disabled={!image}
              />
            )}
          </ButtonFs>
          <Buttons type="Logout" theme={color.danger} onPress={handleSignOut} />
        </ButtonsContainer>
      </ScrollView>
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
  navigation,
  profile = null,
}) => {
  return (
    <ProfileContainer>
      <YLine theme={theme} />
      <ProfileBody>
        <View>
          <Body2>{`#ID-${id?.split('-')[0]}`}</Body2>
          <Display2>{name}</Display2>
          <Display4>{email}</Display4>
        </View>
        <View>
          <Body2 color={theme}>Birthday</Body2>
          <Body5>{birthday}</Body5>
        </View>
        <View>
          <Body2 color={theme}>Institution</Body2>
          <Body5>{institution || '-'}</Body5>
        </View>
        <View>
          <Body2 color={theme}>Description</Body2>
          <Body5>{description || '-'}</Body5>
        </View>
        {profile && (
          <SmallButtons
            type="Edit Profile"
            theme={theme}
            onPress={() =>
              navigation.navigate('EditProfile', {...profile, edit: true})
            }
          />
        )}
      </ProfileBody>
    </ProfileContainer>
  );
};
