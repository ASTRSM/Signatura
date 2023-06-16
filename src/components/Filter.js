import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import IconContainer from './IconContainer';
import {Body2} from './typographies';
import {color} from '../styles/variables';
import {Picker} from '@react-native-picker/picker';

const FilterContainer = styled.View`
  flex-direction: column;
  margin-bottom: ${moderateScale(12)}px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${moderateScale(12)}px;
  background-color: ${color.white};
  border-radius: 30px;
  border: 1px solid ${color.gray5};
`;

const SearchInput = styled.TextInput`
  font-family: 'PlusJakartaSans-Light';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${color.gray1};
  flex: 1;
`;

const SortingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FilterItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${moderateScale(4)}px ${moderateScale(8)}px;
  max-width: ${moderateScale(125)}px;
  gap: ${moderateScale(4)}px;
`;

const FilterLine = styled.View`
  width: 1px;
  height: ${moderateScale(16)}px;
  background-color: ${color.gray3};
`;

const FilterButton = styled.Pressable`
  background-color: ${color.success};
  border-radius: 30px;
  padding: ${moderateScale(8)}px ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
`;

export default function Filter({
  search,
  setSearch,
  dateSort,
  setDateSort,
  nameSort,
  setNameSort,
  status,
  setStatus,
  handleFilter,
}) {
  return (
    <FilterContainer>
      <SearchContainer>
        <SearchInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <IconContainer
          size={15}
          source={require('../../assets/Icons/Search.png')}
        />
      </SearchContainer>
      <SortingContainer>
        <FilterItem
          onPress={() => setDateSort(dateSort === 'desc' ? 'asc' : 'desc')}>
          <IconContainer
            size={15}
            source={require('../../assets/Icons/DateSmall.png')}
          />
          <Body2 color={color.gray2}>Date</Body2>
          <IconContainer
            size={15}
            source={
              dateSort === 'desc'
                ? require('../../assets/Icons/SortDown.png')
                : require('../../assets/Icons/SortUp.png')
            }
          />
        </FilterItem>
        <FilterLine />
        <FilterItem
          onPress={() => setNameSort(nameSort === 'desc' ? 'asc' : 'desc')}>
          <IconContainer
            size={15}
            source={require('../../assets/Icons/Person.png')}
          />
          <Body2 color={color.gray2}>Name</Body2>
          <IconContainer
            size={15}
            source={
              nameSort === 'desc'
                ? require('../../assets/Icons/SortDown.png')
                : require('../../assets/Icons/SortUp.png')
            }
          />
        </FilterItem>
        <FilterLine />
        <Picker
          selectedValue={status}
          onValueChange={itemValue => setStatus(itemValue)}
          style={style.picker}
          fontFamily="PlusJakartaSans-SemiBold">
          <Picker.Item label="Status" value="all" style={style.pickerItem} />
          <Picker.Item
            label="Pending"
            value="pending"
            style={style.pickerItem}
          />
          <Picker.Item
            label="Approved"
            value="approved"
            style={style.pickerItem}
          />
          <Picker.Item
            label="Rejected"
            value="rejected"
            style={style.pickerItem}
          />
        </Picker>
      </SortingContainer>
      <FilterButton onPress={handleFilter}>
        <Body2 color={color.gray2}>Filter</Body2>
      </FilterButton>
    </FilterContainer>
  );
}

const style = StyleSheet.create({
  picker: {
    flex: 1,
    maxWidth: moderateScale(125),
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: color.gray2,
    fontSize: moderateScale(3),
  },
  pickerItem: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    color: color.gray2,
  },
});
