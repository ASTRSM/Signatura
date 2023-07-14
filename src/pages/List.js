import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard, ScrollView, StatusBar} from 'react-native';
import KeyView from '../components/KeyView';
import Switch from '../components/Switch';
import Title from '../components/Titles';
import {color} from '../styles/variables';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';
import ExchangeCard from '../components/ExchangeCard';
import Filter from '../components/Filter';
import {useGetSignaturesQuery} from '../redux/slices/apiSlice';
import {useSelector} from 'react-redux';
import {NoData} from '../components/NoData';
import IconContainer from '../components/IconContainer';

const Container = styled.View`
  padding: 0 ${moderateScale(24)}px;
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function List({navigation, route}) {
  const params = route.params;
  const userId = useSelector(state => state.user?.id);
  const [page, setPage] = useState(params?.page || 'request');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [status, setStatus] = useState(params?.status || '');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [parameters, setParameters] = useState({
    search: '',
    sort: '',
    status: params?.status || '',
  });

  const {data, isFetching} = useGetSignaturesQuery({
    ...parameters,
    id: userId,
    page,
  });

  useEffect(() => {
    if (params?.page) {
      setPage(params.page);
    }
    if (params?.status) {
      setStatus(params.status);
    }
    if (params?.page || params?.status) {
      setParameters({
        search: '',
        sort: '',
        status: params?.status || '',
      });

      navigation.setParams({
        page: '',
        status: '',
      });
    }
  }, [navigation, params, page]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardShown(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardShown(false));
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);

  const list = useMemo(() => data || [], [data]);

  const handleFilter = useCallback(() => {
    setParameters({
      search,
      sort,
      status,
    });
    navigation.setParams({
      page: '',
      status: '',
    });
  }, [navigation, search, sort, status]);

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
          sort={sort}
          setSort={setSort}
          status={status}
          setStatus={setStatus}
          handleFilter={handleFilter}
          isRequest={page === 'request'}
          navigation={navigation}
          isFetching={isFetching}
        />
        {isFetching ? (
          <LoadingContainer>
            <IconContainer
              size={32}
              source={require('../../assets/images/Loading.gif')}
            />
          </LoadingContainer>
        ) : list.length > 0 ? (
          <ScrollView>
            {list.map(item => (
              <ExchangeCard
                key={item.id}
                id={item.id}
                navigation={navigation}
                userId={userId}
                signature={item}
                type="list"
              />
            ))}
          </ScrollView>
        ) : (
          <NoData keyboardShown={keyboardShown} />
        )}
      </Container>
    </KeyView>
  );
}
