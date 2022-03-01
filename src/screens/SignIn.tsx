import React, {useState} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import Logo from 'assets/images/logo.png';

const SignIn = () => {
  const [inputState, setInputState] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const {email, password} = inputState;
  return (
    <ContainerView>
      <ImageContainerView>
        <Image source={Logo} />
      </ImageContainerView>
      <InfomationContainerView>
        <InputContainerView>
          <LabelText>이메일</LabelText>
          <InputTextInput
            placeholder="이메일을 입력해주세요"
            value={email}
            onChangeText={text => setInputState({...inputState, email: text})}
          />
        </InputContainerView>
        <InputContainerView>
          <LabelText>비밀번호</LabelText>
          <InputTextInput
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={text =>
              setInputState({...inputState, password: text})
            }
            secureTextEntry={true}
          />
        </InputContainerView>
      </InfomationContainerView>
      <LoginButton>
        <LoginText>로그인</LoginText>
      </LoginButton>
    </ContainerView>
  );
};

const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.color.white};
`;

const ImageContainerView = styled.View`
  margin-top: 100px;
  flex: 1;
`;

const InfomationContainerView = styled.View`
  flex: 2;
`;

const InputContainerView = styled.View`
  margin-top: 20px;
`;
const LabelText = styled.Text`
  font-size: 12px;
`;
const InputTextInput = styled.TextInput`
  width: 300px;
  margin-top: 7px;
  padding: 15px;
  border: 1px solid black;
  background-color: ${({theme}) => theme.color.white};
  border-radius: 8px;
`;

const LoginButton = styled.TouchableOpacity`
  margin-bottom: 60px;
  padding: 13px 120px;
  background-color: ${({theme}) => theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;

const LoginText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({theme}) => theme.color.white};
`;

export default SignIn;
