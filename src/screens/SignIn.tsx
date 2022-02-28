import React, {useState} from 'react';
import styled from 'styled-components/native';
import Logo from '@images/logo.png';

const SignIn = () => {
  const [inputState, setInputState] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  console.log(inputState);
  return (
    <Container>
      <ImageContainer>
        <Image source={Logo} />
      </ImageContainer>
      <InfomationContainer>
        <InputContainer>
          <LabelBox>이메일</LabelBox>
          <InputBox
            placeholder="이메일을 입력해주세요"
            value={inputState.email}
            onChangeText={text => setInputState({...inputState, email: text})}
          />
        </InputContainer>
        <InputContainer>
          <LabelBox>비밀번호</LabelBox>
          <InputBox
            placeholder="비밀번호를 입력해주세요"
            value={inputState.password}
            onChangeText={text =>
              setInputState({...inputState, password: text})
            }
            secureTextEntry={true}
          />
        </InputContainer>
      </InfomationContainer>
      <TouchContainer>
        <TextContainer>로그인</TextContainer>
      </TouchContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.color.white};
`;

const ImageContainer = styled.View`
  margin-top: 100px;
  flex: 1;
`;

const Image = styled.Image``;

const InfomationContainer = styled.View`
  flex: 2;
`;

const InputContainer = styled.View`
  margin-top: 20px;
`;
const LabelBox = styled.Text`
  font-size: 12px;
`;
const InputBox = styled.TextInput`
  width: 300px;
  margin-top: 7px;
  padding: 15px;
  border: 1px solid black;
  background-color: ${props => props.theme.color.white};
  border-radius: 8px;
`;

const TouchContainer = styled.TouchableOpacity`
  margin-bottom: 60px;
  padding: 13px 120px;
  background-color: ${props => props.theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;

const TextContainer = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.white};
`;
export default SignIn;
