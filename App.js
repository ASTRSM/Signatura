import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import List from './src/pages/List';
import Profile from './src/pages/Profile';
import Scan from './src/pages/Scan';
import Detail from './src/pages/Detail';
import EditProfile from './src/pages/EditProfile';
import AddRequest from './src/pages/AddRequest';
import ScanResult from './src/pages/ScanResult';
import {useSelector} from 'react-redux';
import {selectAuth} from './src/redux/slices/authSlice';
import {Image} from 'react-native';
import Bottomnav from './src/components/BottomNav';
import Header from './src/components/Header';
import {color} from './src/styles/variables';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ListStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ScanStack = createNativeStackNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator screenOptions={{headerShown: false}}>
      <ListStack.Screen name="ListScreen" component={List} />
      <ListStack.Screen name="AddRequest" component={AddRequest} />
    </ListStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={Register} />
    </ProfileStack.Navigator>
  );
}

function ScanStackScreen() {
  return (
    <ScanStack.Navigator screenOptions={{headerShown: false}}>
      <ScanStack.Screen name="ScanScreen" component={Scan} />
      <ScanStack.Screen name="ScanResult" component={ScanResult} />
    </ScanStack.Navigator>
  );
}

export default function App() {
  const userData = useSelector(selectAuth);

  console.log('userData', userData);

  return (
    <NavigationContainer statusBarColor={color.primary}>
      {!userData?.data ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBar={props => <Bottomnav {...props} />}
          screenOptions={{cardStyle: {backgroundColor: 'white'}}}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerBackground: () => (
                <Image
                  source={require('.//assets/images/HeaderShape.png')}
                  style={{position: 'absolute', top: 0, right: 0, height: 64}}
                />
              ),
              headerBackgroundContainerStyle: {
                backgroundColor: color.primary,
                height: 64,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              },
              headerTitle: props => <Header {...props} />,
              title: 'Gaming pussy nigga foulish man memeg',
            }}
          />
          <Tab.Screen
            name="List"
            component={ListStackScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Scan"
            component={ScanStackScreen}
            options={{headerShown: false}}
          />
          <ListStack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
