import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {logout} = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Getting Started</Text>
        <Text>To get You started, we've detailed a few steps on how to get the most from Sportshub</Text>
        <View>
          <Text>Record using this app</Text>
        </View>
          <Text>2. Create a game</Text>
      </View>
      <Button title="logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
