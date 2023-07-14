import React, {useEffect, useState} from 'react';
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
import AddRequest from './src/pages/AddRequest';
import ScanResult from './src/pages/ScanResult';
import {Image, ToastAndroid} from 'react-native';
import Bottomnav from './src/components/BottomNav';
import Header from './src/components/Header';
import {color} from './src/styles/variables';
import supabase from './src/helper/supabaseInit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from './src/redux/slices/userSlice';

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
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setSession(session);
        AsyncStorage.setItem('session', JSON.stringify(session));

        dispatch(getUser(session?.user.id)).catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });

        AsyncStorage.setItem('user', JSON.stringify(user));
      }
      if (event === 'SIGNED_OUT') {
        setSession(null);
        AsyncStorage.removeItem('session');
        AsyncStorage.removeItem('user');
      }
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (!session) {
      AsyncStorage.getItem('session').then(session => {
        if (session) {
          setSession(JSON.parse(session));
        }
      });
    }

    if (!user && session) {
      dispatch(getUser(session?.user.id)).catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });

      AsyncStorage.setItem('user', JSON.stringify(user));
    }
  }, [dispatch, session, user]);

  return (
    <NavigationContainer statusBarColor={color.primary}>
      {!session ? (
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
              title: user?.name,
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
