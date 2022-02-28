import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Logo from '@images/logo.png';

const Entry = ({navigation}: any) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };
  return (
    <View>
      <Image source={Logo} />
      <TouchableOpacity onPress={() => changeScreen('SignUp')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeScreen('SignIn')}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Entry;
