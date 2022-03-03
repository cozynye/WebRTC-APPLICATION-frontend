import React, {FC} from 'react';
import {View, Text, TextInput} from 'react-native';
import styled from 'styled-components/native';

export type Props = {
  placeholder: string;
  signUpLabel: string;
  baseText?: string;
};

const SignUpTextInput: React.FC<Props> = ({
  placeholder,
  signUpLabel,
  baseText = '',
}) => {
  const [text, onChangeText] = React.useState(baseText);

  return (
    <View>
      <SignUpLabel>{signUpLabel}</SignUpLabel>
      <SignupTextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
      />
    </View>
  );
};

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

export default SignUpTextInput;
