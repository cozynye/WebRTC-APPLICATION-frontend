import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ParamListBase} from '@react-navigation/native';
import {userLogin} from '~/module/auth';
import LeftButton from '@images/icon_feather_arrow_left.png';
import showPwImage from '@images/icon_feather_eye_off.png';
import hidePwImage from '@images/icon_feather_eye_on.png';
import {fetchApi} from '~/config';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const SignUp = ({navigation}: Props) => {
  const changeScreen = (navigateName: string) => {
    navigation.navigate(navigateName);
  };

  const dispatch = useDispatch();

  const [textInputs, setTextInputs] = useState({
    surname: '',
    name: '',
    email: '',
    password: '',
    passwordVerify: '',
  });

  const {surname, name, email, password, passwordVerify} = textInputs;

  const [showPw, setShowPw] = useState({
    pw: true,
    pwVerify: true,
  });

  const [emailWarningText, setEmailWarningText] = useState(true);

  const [warnings, setWarnings] = useState({
    isEmailExisting: false,
    isPwValid: false,
    isPwMatching: false,
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleInputChange = (name: string, value: string) => {
    setTextInputs({...textInputs, [name]: value});
  };

  const handlePwShow = (pwname: string, boolean: boolean) => {
    setShowPw(prev => {
      return {...prev, [pwname]: !boolean};
    });
  };

  const handleWarnings = (warningname: string, setboolean: boolean) => {
    setWarnings(prev => {
      return {...prev, [warningname]: setboolean};
    });
  };

  useEffect(() => {
    const isPwVerified = () => {
      return new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z@$!%*?&\\d]{8,}$').test(
        password,
      );
    };

    if (isPwVerified()) {
      handleWarnings('isPwValid', false);
    } else {
      if (password.length === 0) {
        handleWarnings('isPwValid', false);
      } else {
        handleWarnings('isPwValid', true);
      }
    }

    if (password === passwordVerify) {
      handleWarnings('isPwMatching', false);
    } else {
      if (passwordVerify.length === 0) {
        handleWarnings('isPwMatching', false);
      } else {
        handleWarnings('isPwMatching', true);
      }
    }

    if (
      surname &&
      name &&
      email &&
      isPwVerified() &&
      password === passwordVerify
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email, password, passwordVerify, name, surname]);

  //백엔드로 데이터 보내고, 회원가입 성공했을 시 자동로그인 해주는 부분
  const submitSignUpData = () => {
    if (!submitDisabled) {
      fetch(fetchApi.signUp, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: textInputs.email,
          first_name: textInputs.name,
          last_name: textInputs.surname,
          password: textInputs.password,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.email[0] === '유효한 이메일 주소를 입력하십시오.') {
            setEmailWarningText(false);
            handleWarnings('isEmailExisting', true);
          } else if (res.email[0] === 'user의 email은/는 이미 존재합니다.') {
            setEmailWarningText(true);
            handleWarnings('isEmailExisting', true);
          } else {
            handleWarnings('isEmailExisting', false);
          }
          if (res.email === email) {
            fetch(fetchApi.signin, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
              .then(response => response.json())
              .then(response => {
                dispatch(userLogin(response.token));
                changeScreen('Main');
              })
              .catch(error => alert(error));
          }
        })
        .catch(err => alert(err));
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SignUpView>
        <SignUpHeaderInputView>
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
                    value={surname}
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
                    value={name}
                    placeholder="이름을 입력해주세요"
                  />
                </View>
              </NameView>
            </TwoInputs>

            <View>
              <SignUpLabel>이메일</SignUpLabel>
              <SignupTextInput
                onChangeText={(text: string) =>
                  handleInputChange('email', text)
                }
                value={email}
                placeholder="이메일을 입력해주세요"
                autoCapitalize="none"
              />
            </View>

            {warnings.isEmailExisting && (
              <WarningText>
                {emailWarningText
                  ? '이미 등록된 이메일 주소입니다'
                  : '유효한 이메일 주소를 입력해 주세요'}
              </WarningText>
            )}

            <View>
              <SignUpLabel>비밀번호</SignUpLabel>
              <PwInputView>
                <SignupPwTextInput
                  secureTextEntry={showPw.pw}
                  onChangeText={(text: string) =>
                    handleInputChange('password', text)
                  }
                  value={password}
                  placeholder="비밀번호를 입력해주세요"
                  autoCapitalize="none"
                />
                <ShowPwButton onPress={() => handlePwShow('pw', showPw.pw)}>
                  <ShowPwImage
                    source={showPw.pw ? showPwImage : hidePwImage}
                    resizeMode="contain"
                  />
                </ShowPwButton>
              </PwInputView>
            </View>

            {warnings.isPwValid && (
              <WarningText>
                숫자와 영문자 조합 8자리 이상을 입력해 주세요.
              </WarningText>
            )}

            <View>
              <SignUpLabel>비밀번호 확인</SignUpLabel>
              <PwInputView>
                <SignupPwTextInput
                  autoCapitalize="none"
                  secureTextEntry={showPw.pwVerify}
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

            {warnings.isPwMatching && (
              <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
            )}
          </SignUpInputs>
        </SignUpHeaderInputView>
        <SignUpButtonView>
          <SignUpButton
            disabled={submitDisabled}
            onPress={() => {
              submitSignUpData();
            }}>
            <SignUpButtonText>가입 완료</SignUpButtonText>
          </SignUpButton>
        </SignUpButtonView>
      </SignUpView>
    </KeyboardAwareScrollView>
  );
};

const SignUpView = styled.View`
  background-color: #fff;
  flex: 1;
  width: auto;
  justify-content: space-between;
  padding: 60px 33px;
`;

const SignUpHeaderInputView = styled.View`
  padding-bottom: 20%;
`;

const SignUpHeaderView = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-bottom: 40px;
`;

const SignUpHeaderText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color.black};
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

const WarningText = styled.Text`
  font-size: 12px;
  color: #e01e1e;
  padding: 7px 0 0 15px;
  font-weight: bold;
`;

const SignUpLabel = styled.Text`
  color: ${({theme}) => theme.color.black};
  margin-top: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const SignupTextInput = styled.TextInput`
  margin: 8px 0 0;
  color: ${({theme}) => theme.color.black};
  width: auto;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  align-items: stretch;
`;

const SignupPwTextInput = styled.TextInput`
  margin: 8px 0 0;
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
  top: 44%;
`;

const ShowPwImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.TouchableOpacity`
  border-radius: 8px;
`;
const SignUpButtonView = styled.View`
  padding-bottom: 7%;
`;

const SignUpButton = styled(StyledButton)`
  padding: 13px 0;
  background-color: ${({disabled}) => (disabled ? '#c4c4c4' : '#065e85')};
  align-items: center;
  justify-content: center;
  height: 52px;
`;
const SignUpButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export default SignUp;
