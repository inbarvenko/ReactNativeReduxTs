import React, {ReactNode, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import type {ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SignIn.module';
import {ButtonSolid} from 'react-native-ui-buttons';
import {getUser} from '../../../db/userApi';
import {SignInData} from '../../../../types';
import {useAppDispatch} from '../../../redux/hooks';
import {setUser} from '../../../redux/userReducer';
import Input from '../../../ui/Input/Input';

type Props = NativeStackScreenProps<ParamListBase>;

const SignIn: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const checkPrevSignIn = async () => { 
    const prevUser = await AsyncStorage.getItem('user');

    const jsonValue = prevUser != null ? JSON.parse(prevUser) : null;
    if(jsonValue === null) {return;}
    
    console.log("jsonValue get", jsonValue)

    dispatch(setUser(jsonValue));
    navigation.navigate('Home');
  }

  useEffect(() => {
    checkPrevSignIn()
  }, [])

  const schema = yup.object({
    email: yup
      .string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: yup.string().required('This field is required!'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const checkSignIn = async (data: SignInData) => {
    try {
      const res = await getUser(data);
      if (!res) {
        return console.log();
      }

      await dispatch(setUser(data));

      const jsonValue = JSON.stringify(data);
      console.log("jsonValue set", jsonValue)
      await AsyncStorage.setItem('user', jsonValue);

      await navigation.navigate('Home');
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleStyle}>Sign in please</Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            errors={errors.email}
            type="numbers-and-punctuation"
            underlineColorAndroid="transparent"
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            containerErrorStyle={styles.errorSectionStyle}
            textErrorStyle={styles.errorTextStyle}
            value={value}
            hint="Enter your email"
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            errors={errors.password}
            type="default"
            underlineColorAndroid="transparent"
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            containerErrorStyle={styles.errorSectionStyle}
            textErrorStyle={styles.errorTextStyle}
            value={value}
            hint="Enter your password"
            onBlur={onBlur}
            onChangeText={onChange}
            secure
          />
        )}
      />
      <ButtonSolid
        activeOpacity={0.8}
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={handleSubmit(checkSignIn)}
        title="Sign in"
      />
      <ButtonSolid
        activeOpacity={0.8}
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate('SignUp')}
        title="Go to sign up"
      />
    </View>
  );
};

export default React.memo(SignIn);
