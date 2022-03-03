import React, {FC, useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import showPwImage from '@images/icon_feather_eye_off.png';
import hidePwImage from '@images/icon_feather_eye_on.png';

export type Props = {
  placeholder: string;
  signUpPwLabel: string;
  baseText?: string;
};

const SignUpPwTextInput: React.FC<Props> = ({placeholder, signUpPwLabel}) => {
  const [text, onChangeText] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);

  return (
    <View>
      <SignUpText>{signUpPwLabel}</SignUpText>
      <PwInputView>
        <SignupTextInput
          secureTextEntry={showPw ? true : false}
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
        />
        <ShowPwButton onPress={() => setShowPw(!showPw)}>
          <ShowPwImage
            source={showPw ? showPwImage : hidePwImage}
            resizeMode="contain"
          />
        </ShowPwButton>
      </PwInputView>
    </View>
  );
};

const SignUpText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

const PwInputView = styled.View`
  align-items: center;
  flex-direction: row;
`;

const SignupTextInput = styled.TextInput`
  margin: 8px 0 20px;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  align-items: stretch;
  flex: 1;
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

export default SignUpPwTextInput;
