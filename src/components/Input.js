import React, {memo, useCallback, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Body5, Body8} from './typographies';
import {moderateScale} from 'react-native-size-matters';
import InputView from './InputView';
import IconContainer from './IconContainer';

const StyledTextInput = styled.TextInput`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: ${moderateScale(32)}px;
  height: ${props => (props.multiline ? 'auto' : moderateScale(32) + 'px')};
  color: ${color.gray1};
`;

const InputLabel = styled(Body5)`
  padding: 8px;
`;

const Star = styled(Body5)`
  color: ${color.primary};
  margin: 12px;
  padding: 12px;
`;

const ErrorText = styled(Body8)`
  color: ${color.danger};
  opacity: ${props => (props.error ? 1 : 0)};
  padding: ${moderateScale(2)}px 0 0 ${moderateScale(12)}px;
`;

// memoization so that the component is not re-rendered if the props are the same (caution: only shallow comparison)
// "set" functions are passed as props from the parent component and are not memoized and will cause re-rendering but only corresponding useState "set" functions are re-rendered
// for example, setInput for email will not cause re-rendering for password if you use memoization
export const Input = memo(
  ({
    type,
    isImportant,
    setInput,
    textInput,
    isSecret = false,
    handleError = () => {},
    handleKeyboard = () => {},
    password = '',
    testID,
    isMultiline = false,
  }) => {
    const [inputError, setInputError] = useState('');
    const [isHidden, setIsHidden] = useState(isSecret);

    // useEffect is used to run the function only when the password changes
    useEffect(() => {
      if (!!password && type === 'Confirm Password' && textInput.length > 0) {
        handleTextChange(textInput);
      }
    }, [handleTextChange, password, textInput, type]);

    // useCallback is used to memoize the function so that it is not re-created on every re-render
    const handleTextChange = useCallback(
      text => {
        let errorState = false;
        let inputErrorText = '';

        if (text.length < 8 && type === 'Password') {
          inputErrorText = 'Password must be at least 8 characters';
          errorState = true;
        }

        if (type === 'Email' && !validateEmail(text)) {
          inputErrorText = 'Email is not valid';
          errorState = true;
        }

        if (type === 'Confirm Password' && text !== password) {
          inputErrorText = 'Password does not match';
          errorState = true;
        }

        setInputError(inputErrorText);
        handleError(type, errorState);
        setInput(text);
      },
      [handleError, password, setInput, type],
    );

    let eyeIcon = isHidden ? (
      <IconContainer
        source={require('../../assets/Icons/EyeOpen.png')}
        size={14}
      />
    ) : (
      <IconContainer
        source={require('../../assets/Icons/EyeClosed.png')}
        size={14}
      />
    );

    return (
      <View>
        <InputLabel>
          {type}
          {isImportant && <Star>*</Star>}
        </InputLabel>
        <InputView error={!!inputError}>
          <StyledTextInput
            testID={testID}
            placeholder={type}
            placeholderTextColor={color.gray3}
            textAlignVertical="top"
            onChangeText={text => handleTextChange(text)}
            value={textInput}
            secureTextEntry={isHidden}
            onBlur={() => {
              if (textInput.length === 0 && isImportant) {
                setInputError(`${type} is required`);
                handleError(type, true);
              }
            }}
            onFocus={() => {
              handleKeyboard(true);
            }}
            multiline={isMultiline}
            numberOfLines={isMultiline ? 4 : 1}
          />
          <Pressable
            onPress={() => {
              setIsHidden(!isHidden);
            }}>
            {isSecret && eyeIcon}
          </Pressable>
        </InputView>
        <ErrorText error={!!inputError}>{inputError}</ErrorText>
      </View>
    );
  },
);

const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
