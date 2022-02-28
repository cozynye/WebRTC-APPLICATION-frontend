import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'name'>;
}

const Entry = ({navigation}: Props) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };
  return (
    <EntryView>
      <TouchableOpacity onPress={() => changeScreen('SignUp')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeScreen('SignIn')}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </EntryView>
  );
};

const EntryView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Entry;
