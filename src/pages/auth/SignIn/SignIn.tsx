import React, {ReactNode} from 'react';
import {View, Text, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import type {ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements'
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
            hintText="Enter your email"
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
            hintText="Enter your password"
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
