import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Entry = ({navigation}: Props) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <Container>
      <ImageContainer>
        <Image source={require('@images/logo.png')} />
      </ImageContainer>

      <TouchBox>
        <SignUpButtonContainer onPress={() => changeScreen('SignUp')}>
          <SignUpText>회원가입</SignUpText>
        </SignUpButtonContainer>
        <LoginButtonContainer onPress={() => changeScreen('SignIn')}>
          <LoginText>로그인</LoginText>
        </LoginButtonContainer>
      </TouchBox>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const ImageContainer = styled.View`
  margin-top: 272px;
`;

const Image = styled.Image``;

const TouchBox = styled.View`
  margin-bottom: 60px;
`;

const SignUpButtonContainer = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 13px 120px;
  background-color: ${({theme}) => theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;

const LoginButtonContainer = styled.TouchableOpacity`
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
