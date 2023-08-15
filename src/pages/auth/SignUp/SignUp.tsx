import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import type {ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './SignUp.module';
import {ButtonSolid} from 'react-native-ui-buttons';
import {newUser} from '../../../db/userApi';
import {SignUpData} from '../../../../types';
import {useAppDispatch} from '../../../redux/hooks';
import {setUser} from '../../../redux/userReducer';
import Input from '../../../ui/Input/Input';

type Props = NativeStackScreenProps<ParamListBase>;

const SignUp: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: yup
      .string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: yup.string().required('This field is required!'),
    repeatPassword: yup.string().required('This field is required!'),
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

  const checkSignUp = async (data: SignUpData) => {
    try {
      const res = await newUser(data);
      if (!res) {
        return console.log('error new user');
      }

      await dispatch(setUser(data));
      await navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleStyle}>Sign up please</Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            errors={errors.email}
            type="numbers-and-punctuation"
            containerStyle={styles.inputContainer}
            underlineColorAndroid="transparent"
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
      <Controller
        control={control}
        name="repeatPassword"
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
            hint="Enter your password again"
            onBlur={onBlur}
            onChangeText={onChange}
            secure
          />
        )}
      />
      <ButtonSolid
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={handleSubmit(checkSignUp)}
        title="Sign up"
      />
      <ButtonSolid
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate('SignIn')}
        title="Go to sign in"
      />
    </View>
  );
};

export default SignUp;
