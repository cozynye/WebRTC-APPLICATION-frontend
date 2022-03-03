import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MainImage from 'assets/images/illu_01.png';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const Main = ({navigation}: Props) => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token === undefined || auth.token === null) {
      navigation.navigate('Entry');
    }
  }, [auth.token, navigation]);
  return (
    <ContainerView>
      <TextView>
        <FirstLineText>이제 모바일로</FirstLineText>
        <SecondLineText>편하게 상담받으세요</SecondLineText>
        <ThirdLineText>언제 어디서든지 전문의에게 상담받으세요.</ThirdLineText>
      </TextView>
      <ImageContainerView>
        <Image source={MainImage} resizeMode="contain" style={{height: 337}} />
      </ImageContainerView>
      <ConnectionButton>
        <ConnectionText>화상연결</ConnectionText>
      </ConnectionButton>
    </ContainerView>
  );
};

const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.color.white};
  padding-top: 100px;
  padding-bottom: 60px;
`;

const TextView = styled.View`
  align-self: flex-start;
  right: -30px;
`;

const FirstLineText = styled.Text`
  font-size: 22px;
`;
const SecondLineText = styled.Text`
  padding-top: 12px;
  color: ${({theme}) => theme.color.primary};
  font-size: 26px;
`;
const ThirdLineText = styled.Text`
  padding-top: 12px;
  font-size: 12px;
`;

const ImageContainerView = styled.View``;

const ConnectionButton = styled.TouchableOpacity`
  margin-bottom: 60px;
  padding: 13px 120px;
  background-color: ${({theme}) => theme.color.primary};
  border-radius: 8px;
  align-items: center;
`;
const ConnectionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({theme}) => theme.color.white};
`;

export default Main;
