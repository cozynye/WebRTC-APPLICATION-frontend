import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SignUpTextInput from '@components/SignUpTextInput';
import SignUpPwTextInput from '@components/SignUpPwTextInput';
import LeftButton from '@images/icon_feather_arrow_left.png';
import {PrivateValueStore} from '@react-navigation/native';
import showPwImage from '@images/icon_feather_eye_off.png';
import hidePwImage from '@images/icon_feather_eye_on.png';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'name'>;
}

const SignUp = ({navigation}: Props) => {
  const changeScreen = (name: string) => {
    navigation.navigate(name);
  };
  const [textInputs, setTextInputs] = React.useState({
    surname: '',
    name: '',
    email: '',
    password: '',
    passwordVerify: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setTextInputs({...textInputs, [name]: value});
  };

  const [showPw, setShowPw] = React.useState({
    pw: true,
    pwVerify: true,
  });

  const handlePwShow = (name: string, value: boolean) => {
    setShowPw({...showPw, [name]: !value});
  };

  return (
    <SignUpView>
      <View>
        <SignUpHeaderView>
          <SignUpHeaderText>회원가입</SignUpHeaderText>
          <GoBackButton onPress={() => changeScreen('Entry')}>
            <GoBackImage source={LeftButton} />
          </GoBackButton>
        </SignUpHeaderView>
        <SignUpInputs>
          <TwoInputs>
            <SurnameView>
              <View>
                <SignUpLabel>성</SignUpLabel>
                <SignupTextInput
                  onChangeText={(text: string) =>
                    handleInputChange('surname', text)
                  }
                  value={textInputs.surname}
                  placeholder="성을 입력해주세요"
                />
              </View>
            </SurnameView>
            <NameView>
              <View>
                <SignUpLabel>이름</SignUpLabel>
                <SignupTextInput
                  onChangeText={(text: string) =>
                    handleInputChange('name', text)
                  }
                  value={textInputs.name}
                  placeholder="이름을 입력해주세요"
                />
              </View>
            </NameView>
          </TwoInputs>
          <View>
            <SignUpLabel>이메일</SignUpLabel>
            <SignupTextInput
              onChangeText={(text: string) => handleInputChange('email', text)}
              value={textInputs.email}
              placeholder="이메일을 입력해주세요"
            />
          </View>
          <View>
            <SignUpLabel>비밀번호</SignUpLabel>
            <PwInputView>
              <SignupPwTextInput
                secureTextEntry={showPw.pw ? true : false}
                onChangeText={(text: string) =>
                  handleInputChange('password', text)
                }
                value={textInputs.password}
                placeholder="비밀번호를 입력해주세요"
              />
              <ShowPwButton onPress={() => handlePwShow('pw', showPw.pw)}>
                <ShowPwImage
                  source={showPw.pw ? showPwImage : hidePwImage}
                  resizeMode="contain"
                />
              </ShowPwButton>
            </PwInputView>
          </View>
          <View>
            <SignUpLabel>비밀번호 확인</SignUpLabel>
            <PwInputView>
              <SignupPwTextInput
                secureTextEntry={showPw.pw ? true : false}
                onChangeText={(text: string) =>
                  handleInputChange('passwordVerify', text)
                }
                value={textInputs.passwordVerify}
                placeholder="비밀번호를 다시 입력해주세요"
              />
              <ShowPwButton
                onPress={() => handlePwShow('pwVerify', showPw.pwVerify)}>
                <ShowPwImage
                  source={showPw.pwVerify ? showPwImage : hidePwImage}
                  resizeMode="contain"
                />
              </ShowPwButton>
            </PwInputView>
          </View>
        </SignUpInputs>
      </View>
      <SignUpButton>
        <SignUpButtonText>가입 완료</SignUpButtonText>
      </SignUpButton>
    </SignUpView>
  );
};

const SignUpHeaderView = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-bottom: 40px;
`;

const SignUpHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
`;

const GoBackImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const SignUpView = styled.View`
  background-color: #fff;
  flex: 1;
  width: auto;
  justify-content: space-between;
  padding: 60px 33px;
`;

const SignUpLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

const SignupTextInput = styled.TextInput`
  margin: 8px 0 20px;
  width: auto;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  align-items: stretch;
`;

const SignupPwTextInput = styled.TextInput`
  margin: 8px 0 20px;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  align-items: stretch;
  flex: 1;
`;

const SignUpInputs = styled.View`
  align-items: stretch;
`;

const TwoInputs = styled.View`
  flex-direction: row;
`;

const SurnameView = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const NameView = styled.View`
  flex: 1;
`;

const PwInputView = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ShowPwButton = styled.TouchableOpacity`
  width: 16.8px;
  height: 16.8px;
  position: absolute;
  right: 15px;
  top: 24.3px;
`;

const ShowPwImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.TouchableOpacity`
  border-radius: 8px;
`;

const SignUpButton = styled(StyledButton)`
  padding: 13px 0;
  background-color: #065e85;
  align-items: center;
  justify-content: center;
  height: 52px;
`;
const SignUpButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default SignUp;
