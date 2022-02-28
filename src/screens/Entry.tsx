import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'name'>;
}

const Entry = ({navigation}: Props) => {
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
