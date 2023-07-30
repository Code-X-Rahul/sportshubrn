import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {useAuth} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, isSignedin, getUser} = useAuth();

  useEffect(() => {
    getUser();
  }, [isSignedin, user]);

  return (
    <Stack.Navigator>
      {!isSignedin ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
