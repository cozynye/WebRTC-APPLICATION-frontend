import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Entry = ({navigation}) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };
  return (
    <View>
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
