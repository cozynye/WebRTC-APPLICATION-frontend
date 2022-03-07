import React, {useState} from 'react';
import {Alert, Image} from 'react-native';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogin} from '~/module/auth';
import Logo from 'assets/images/logo.png';
import EyeOff from 'assets/images/icon_feather_eye_off.png';
import Eye from 'assets/images/icon_feather_eye_on.png';
import {fetchAPI} from '~/config';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const SignIn = ({navigation}: Props) => {
  const [inputState, setInputState] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const {email, password} = inputState;
  const [isPasswordType, setIsPasswordType] = useState(true);

  const dispatch = useDispatch();
  const changePasswordType = () => {
    setIsPasswordType(prev => !prev);
  };

  const login = async () => {
    if (!inputState.email || !inputState.password) {
      Alert.alert('이메일 또는 비밀번호를 입력하세요.');
      return;
    }
    try {
      const response = await fetch(fetchAPI.Login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await response.json();
      if (response.status === 200) {
        dispatch(userLogin(json.token));
        navigation.navigate('Main');
      } else if (response.status === 400) {
        if (json.email) {
          throw new Error(json.email);
        } else if (json.message) {
          throw new Error(json.message);
        }
      } else {
        throw new Error(json);
      }
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert(err.message);
      } else {
        Alert.alert(String(err));
      }
    }
  };
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
            autoCapitalize="none"
            value={email}
            onChangeText={text => setInputState({...inputState, email: text})}
          />
        </InputContainerView>
        <InputContainerView>
          <LabelText>비밀번호</LabelText>
          <PassWordView>
            <InputTextInput
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChangeText={text =>
                setInputState({...inputState, password: text})
              }
              secureTextEntry={isPasswordType}
            />
            <IconButton onPress={changePasswordType} activeOpacity={0.9}>
              <Image source={isPasswordType ? EyeOff : Eye} />
            </IconButton>
          </PassWordView>
        </InputContainerView>
      </InfomationContainerView>
      <LoginButton onPress={login}>
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

const PassWordView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  margin-top: 5px;
  margin-left: -30px;
`;

export default SignIn;
