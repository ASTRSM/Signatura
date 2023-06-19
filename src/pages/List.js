import React, {useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import KeyView from '../components/KeyView';
import Switch from '../components/Switch';
import Title from '../components/Titles';
import {color} from '../styles/variables';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import ExchangeCard from '../components/ExchangeCard';
import Filter from '../components/Filter';
import {newestList} from '../helper/newestList';

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
`;

export default function List({navigation}) {
  const [list, setList] = useState(newestList);
  const [page, setPage] = useState('request');
  const [search, setSearch] = useState('');
  const [dateSort, setDateSort] = useState('desc');
  const [nameSort, setNameSort] = useState('desc');
  const [status, setStatus] = useState('desc');

  const handleFilter = () => {
    console.log('filtered');
  };

  return (
    <KeyView>
      <Container>
        <StatusBar
          backgroundColor={page === 'sign' ? color.secondary : color.primary}
        />
        <Title
          title="Item List"
          lineColor={page === 'sign' ? color.secondary : color.primary}
        />
        <Switch page={page} setPage={setPage} />
        <Filter
          search={search}
          setSearch={setSearch}
          dateSort={dateSort}
          setDateSort={setDateSort}
          nameSort={nameSort}
          setNameSort={setNameSort}
          status={status}
          setStatus={setStatus}
          handleFilter={handleFilter}
          isRequest={page === 'request'}
          navigation={navigation}
        />
        <ScrollView>
          {newestList.map(item => (
            <ExchangeCard
              key={item.id}
              id={item.id}
              navigation={navigation}
              type="list"
            />
          ))}
          {newestList.map(item => (
            <ExchangeCard
              key={item.id}
              id={item.id}
              navigation={navigation}
              type="list"
            />
          ))}
        </ScrollView>
      </Container>
    </KeyView>
  );
}
