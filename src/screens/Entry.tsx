import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import Logo from 'assets/images/logo.png';
import {ParamListBase} from '@react-navigation/native';
import {View} from 'react-native';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const Entry = ({navigation}: Props) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <ContainerView>
      <ImageContainerView>
        <Image source={Logo} />
      </ImageContainerView>

      <TouchContainerView>
        <SignUpButton onPress={() => changeScreen('SignUp')}>
          <SignUpText>회원가입</SignUpText>
        </SignUpButton>
        <LoginButton onPress={() => changeScreen('SignIn')}>
          <LoginText>로그인</LoginText>
        </LoginButton>
      </TouchContainerView>
    </ContainerView>
  );
};
const ContainerView = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const ImageContainerView = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image``;

const TouchContainerView = styled.View`
  margin-bottom: 60px;
`;

const SignUpButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 13px 120px;
  background-color: ${({theme}) => theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;

const LoginButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 13px 120px;
  background-color: ${({theme}) => theme.color.white};
  border: 1px solid ${({theme}) => theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;

const SignUpText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const LoginText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.primary};
`;

export default Entry;
