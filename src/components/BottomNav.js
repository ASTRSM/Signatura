import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {color} from '../styles/variables';
import {Body5} from './typographies';
import {scale} from 'react-native-size-matters';
import IconContainer from './IconContainer';

const BottomNavView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 6px 24px;
  background: ${color.primary};
`;

const BottomNavText = styled(Body5)`
  color: ${color.white};
`;

const BottomNavButton = styled.Pressable`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${props =>
    props.isFocused ? color.primaryLight : color.primary};
  width: ${scale(64)}px;
  padding: 3px;
`;

export default function Bottomnav({state, descriptors, navigation}) {
  const [homeLabel, listLavel, profileLabel, scanLabel] = state.routes.map(
    route => {
      const {options} = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
      return label;
    },
  );

  const options = {
    length: state.routes.length,
    home: {
      label: homeLabel,
      index: 0,
      isFocused: state.index === 0,
      key: state.routes[0].key,
    },
    list: {
      label: listLavel,
      index: 1,
      isFocused: state.index === 1,
      key: state.routes[1].key,
    },
    profile: {
      label: profileLabel,
      index: 2,
      isFocused: state.index === 2,
      key: state.routes[2].key,
    },
    scan: {
      label: scanLabel,
      index: 3,
      isFocused: state.index === 3,
      key: state.routes[3].key,
    },
  };

  const onPress = useCallback(
    (key, isFocused, label) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(label);
      }
    },
    [navigation],
  );

  return (
    <BottomNavView>
      <BottomNavButton
        isFocused={options.home.isFocused}
        onPress={onPress.bind(
          this,
          options.home.key,
          options.home.isFocused,
          options.home.label,
        )}>
        <IconContainer
          source={require('../../assets/Icons/Home.png')}
          size={24}
        />
        <BottomNavText>{options.home.label}</BottomNavText>
      </BottomNavButton>
      <BottomNavButton
        isFocused={options.list.isFocused}
        onPress={onPress.bind(
          this,
          options.list.key,
          options.list.isFocused,
          options.list.label,
        )}>
        <IconContainer
          source={require('../../assets/Icons/List.png')}
          size={24}
        />
        <BottomNavText>{options.list.label}</BottomNavText>
      </BottomNavButton>
      <BottomNavButton
        isFocused={options.profile.isFocused}
        onPress={onPress.bind(
          this,
          options.profile.key,
          options.profile.isFocused,
          options.profile.label,
        )}>
        <IconContainer
          source={require('../../assets/Icons/Profile.png')}
          size={24}
        />
        <BottomNavText>{options.profile.label}</BottomNavText>
      </BottomNavButton>
      <BottomNavButton
        isFocused={options.scan.isFocused}
        onPress={onPress.bind(
          this,
          options.scan.key,
          options.scan.isFocused,
          options.scan.label,
        )}>
        <IconContainer
          source={require('../../assets/Icons/Scan.png')}
          size={42}
        />
      </BottomNavButton>
    </BottomNavView>
  );
}
