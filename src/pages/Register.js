import React, {useState} from 'react';
import {Platform, ScrollView, StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Heading3, Body1} from '../components/typographies';
import {Input} from '../components/Input';
import {scale, verticalScale} from 'react-native-size-matters';
import AndroidDatePicker from '../components/AndroidDatePicker';
import useInputError from '../hooks/InputError';
import {useSignUpMutation} from '../redux/slices/apiSlice';

const KeyView = styled.KeyboardAvoidingView`
  background-color: ${color.white};
  flex: 1;
`;

const AuthButton = styled.Pressable`
  background-color: ${color.primary};
  padding: 12px 32px;
  border-radius: 12px;
  margin: 12px 0;
  align-self: flex-end;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const AuthButtonText = styled.Text`
  color: ${color.white};
  letter-spacing: 1px;
  font-family: 'PlusJakartaSans-Regular';
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;

const LoginView = styled.View`
  width: 100%;
`;

const LoginHeader = styled.View`
  margin-bottom: 24px;
`;

const ShapeTop = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  height: ${verticalScale(274 / 2)}px;
  width: ${scale(357 / 2)}px;
`;

export default function Register({navigation, route}) {
  const params = route?.params;
  const pageType = params?.edit ? 'Edit Profile' : 'Register';
  const [name, setName] = useState(params?.name ?? 'Dhafa D');
  const [email, setEmail] = useState(params?.email ?? 'ddefrito84@gmail.com');
  const [password, setPassword] = useState(params?.password ?? '123123123');
  const [confirmPassword, setConfirm] = useState('123123123');
  const [birthday, setBirthday] = useState(
    params?.birthday ? new Date(params?.birthday) : new Date(2000, 0, 1),
  );
  const [institution, setInstitution] = useState(params?.institution ?? '');
  const [description, setDescription] = useState(params?.description ?? '');
  const [inputError, handleError] = useInputError();
  const [signUp, {isLoading}] = useSignUpMutation();

  let disabled = false;
  if (
    Object.values(inputError).includes(true) ||
    [email, password, confirmPassword, birthday].some(item => item.length === 0)
  ) {
    disabled = true;
  }

  const handlePress = async () => {
    if (pageType === 'Register') {
      try {
        await signUp({
          email,
          password,
          name,
          birthday,
          institution,
          description,
        }).unwrap();
        navigation.navigate('Login');
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      }
    } else {
      console.log('edit profile');
    }
  };

  return (
    <KeyView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      testID="register-page">
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 32,
          justifyContent: 'center',
        }}>
        <ShapeTop source={require('../../assets/images/ShapeLoginTop.png')} />
        <LoginView>
          <LoginHeader>
            <Heading3>{pageType}</Heading3>
            {params?.edit ? null : <Body1>Please register to continue</Body1>}
          </LoginHeader>
          <Input
            type="Name"
            isImportant={true}
            setInput={setName}
            textInput={name}
            isSecret={false}
            handleError={handleError}
          />
          <Input
            type="Email"
            isImportant={true}
            setInput={setEmail}
            textInput={email}
            isSecret={false}
            handleError={handleError}
          />
          {params?.edit ? null : (
            <>
              <Input
                type="Password"
                isImportant={true}
                setInput={setPassword}
                textInput={password}
                isSecret={true}
                handleError={handleError}
              />
              <Input
                type="Confirm Password"
                isImportant={true}
                setInput={setConfirm}
                textInput={confirmPassword}
                isSecret={true}
                handleError={handleError}
                password={password}
              />
            </>
          )}
          <AndroidDatePicker
            type="Birthday"
            isImportant={true}
            setDate={setBirthday}
            date={birthday}
            handleError={handleError}
            testID="birthday-input"
          />
          <Input
            type="Institution"
            isImportant={false}
            setInput={setInstitution}
            textInput={institution}
            isSecret={false}
            handleError={handleError}
          />
          <Input
            type="Description"
            isImportant={false}
            setInput={setDescription}
            textInput={description}
            isSecret={false}
            handleError={handleError}
            isMultiline={true}
          />
          <AuthButton
            testID={pageType === 'Register' ? 'register-button' : 'edit-button'}
            disabled={disabled || isLoading}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? color.primary : color.primary,
              },
            ]}
            onPress={() => {
              handlePress();
            }}>
            <AuthButtonText>{pageType}</AuthButtonText>
          </AuthButton>
        </LoginView>
      </ScrollView>
    </KeyView>
  );
}
