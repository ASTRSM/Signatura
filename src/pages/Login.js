import React, {useState} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Heading3, Body1, Body2} from '../components/typographies';
import {Input} from '../components/Input';
import {scale, verticalScale} from 'react-native-size-matters';
import KeyView from '../components/KeyView';
import useInputError from '../hooks/InputError';
import {useSignInMutation} from '../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const OptionsView = styled.View`
  flex-direction: row;
`;

const OptionsLink = styled(Body2)`
  color: ${color.primary};
  margin-left: 5px;
`;

const ShapeBottom = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${verticalScale(341 / 2)}px;
  width: ${scale(644 / 2)}px;
`;

const ShapeTop = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  height: ${verticalScale(274 / 2)}px;
  width: ${scale(357 / 2)}px;
`;

export default function Login({navigation}) {
  const [email, setEmail] = useState('ddefrito84@gmail.com');
  const [password, setPassword] = useState('123123123');
  const [inputError, handleError] = useInputError();
  const [signIn, {isLoading}] = useSignInMutation();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  let disabled = false;
  if (
    Object.values(inputError).includes(true) ||
    [email, password].includes('')
  ) {
    disabled = true;
  }

  const handleLogin = async () => {
    try {
      const data = await signIn({email, password}).unwrap();
      await AsyncStorage.setItem('auth', JSON.stringify(data));
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  };

  return (
    <KeyView>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 32,
          justifyContent: 'center',
        }}>
        <ShapeTop source={require('../../assets/images/ShapeLoginTop.png')} />
        {!keyboardOpen && (
          <ShapeBottom
            source={require('../../assets/images/ShapeLoginBottom.png')}
          />
        )}
        <LoginView>
          <LoginHeader>
            <Heading3 color={color.gray2}>Login</Heading3>
            <Body1>Please Sign in to continue</Body1>
          </LoginHeader>
          <Input
            type="Email"
            isImportant={true}
            setInput={setEmail}
            textInput={email}
            isSecret={false}
            handleError={handleError}
            handleKeyboard={setKeyboardOpen}
            testID="email-input"
          />
          <Input
            type="Password"
            isImportant={true}
            setInput={setPassword}
            textInput={password}
            isSecret={true}
            handleError={handleError}
            handleKeyboard={setKeyboardOpen}
            testID="password-input"
          />
          <View>
            <OptionsView>
              <Body2 color={color.gray2}>Don't have an account?</Body2>
              <Pressable
                onPress={() => {
                  navigation.navigate('Register');
                }}
                testID="register-button">
                <OptionsLink>Register</OptionsLink>
              </Pressable>
            </OptionsView>
            <OptionsView>
              <Body2 color={color.gray2}>Forgot</Body2>
              <Pressable>
                <OptionsLink>password?</OptionsLink>
              </Pressable>
            </OptionsView>
          </View>
          <AuthButton
            testID="login-button"
            disabled={disabled || isLoading}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? color.primary : color.primary,
              },
            ]}
            onPress={() => {
              handleLogin();
            }}>
            <AuthButtonText>LOGIN</AuthButtonText>
          </AuthButton>
        </LoginView>
      </ScrollView>
    </KeyView>
  );
}
