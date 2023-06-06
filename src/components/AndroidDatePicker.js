import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React, {memo, useEffect, useState} from 'react';
import InputView from './InputView';
import {moderateScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {Body2, Body5} from './typographies';
import {color} from '../styles/variables';
import IconContainer from './IconContainer';
import {View} from 'react-native';

const StyledPressable = styled.Pressable`
  height: ${moderateScale(32)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: 'PlusJakartaSans-SemiBold';
`;

const InputLabel = styled(Body5)`
  padding: 8px;
`;

const Star = styled(Body5)`
  color: ${color.primary};
  margin: 12px;
  padding: 12px;
`;

export default memo(function AndroidDatePicker({
  type,
  isImportant,
  handleError,
  setInput,
}) {
  const [date, setDate] = useState(new Date());
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    let errorState = false;
    let inputErrorText = '';

    const isDefaultDate =
      date?.getMonth() === new Date().getMonth() &&
      date?.getDate() === new Date().getDate() &&
      date?.getFullYear() === new Date().getFullYear();
    if (isDefaultDate) {
      errorState = true;
      inputErrorText = 'Please input your Birthday';
    } else if (date?.getFullYear() > new Date().getFullYear() - 15) {
      errorState = true;
      inputErrorText = 'You must be at least 15 years old';
    }

    handleError(type, errorState);
    setInputError(inputErrorText);
  }, [date, handleError, type]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setInput(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={{marginBottom: 14}}>
      <InputLabel>
        {type}
        {isImportant && <Star>*</Star>}
      </InputLabel>
      <InputView>
        <StyledPressable onPress={showDatepicker} testID="birthday-input">
          <Body2 color={inputError ? color.danger : color.gray1}>
            {inputError
              ? inputError
              : date?.toLocaleString(['ID-id'], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Body2>
          <IconContainer
            source={require('../../assets/Icons/Date.png')}
            size={14}
          />
        </StyledPressable>
      </InputView>
    </View>
  );
});
