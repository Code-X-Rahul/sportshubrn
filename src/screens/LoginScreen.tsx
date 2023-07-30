import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const submitHandler = async () => {
    const url = 'http://192.168.149.224:3000/api/v1/auth/login';
    try {
      setIsLoading(true);
      const {data}: any = await axios.post(url, {name, email, password});
      setUser(data);
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/sportshub.jpg')}
        style={styles.bgImage}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>SportsHub</Text>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLoading ? 'Loading...' : 'Login'}</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={'#242B2E'}
            style={styles.input}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="password"
            placeholderTextColor={'#242B2E'}
            style={styles.input}
          />
          <TouchableOpacity
            disabled={isLoading}
            style={styles.SubmitBtn}
            onPress={() => submitHandler()}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
    objectFit: 'contain',
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    zIndex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  formContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ccc',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  SubmitBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
