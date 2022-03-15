import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import {View, ViewStyle} from 'react-native';
import {
  CameraImage,
  AudioOnImage,
  VideoOnImage,
  VideoOffImage,
} from 'assets/images/index';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const doctorVideoStyle: ViewStyle = {
  backgroundColor: '#f2f2f2',
  height: '100%',
  width: '100%',
  position: 'absolute',
};

const patientVideoStyle: ViewStyle = {
  backgroundColor: '#f2f2f2',
  height: '100%',
  width: '100%',
  borderRadius: 8,
};

const VideoChat = ({}: Props) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isFrontVideo, setIsFrontVideo] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  const initVideo = async () => {
    const configuration = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };
    const localPC = new RTCPeerConnection(configuration);
    const medias = await mediaDevices.enumerateDevices();
    mediaDevices
      .getUserMedia({
        audio: true,
        video: isVideo
          ? {facingMode: isFrontVideo ? 'user' : 'environment'}
          : false,
      })
      .then(stream => {
        setLocalStream(stream);
        localPC.addStream(stream);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    initVideo();
  }, [isFrontVideo, isVideo]);

  return (
    <VideoChatView>
      <RTCView
        streamURL={localStream ? localStream.toURL() : ''}
        style={doctorVideoStyle}
        objectFit="cover"
      />
      <ExitView>
        <ExitButton>
          <ExitText>나가기</ExitText>
        </ExitButton>
      </ExitView>

      <MainView>
        <View style={{width: 100}} />
        <DoctorNameView>
          <DoctorNameText>Test11</DoctorNameText>
        </DoctorNameView>
        <PatientVideoView style={{borderRadius: 8, overflow: 'hidden'}}>
          <PatientNameView>
            <PatientNameText>Test2</PatientNameText>
          </PatientNameView>
          <RTCView
            streamURL={localStream ? localStream.toURL() : ''}
            style={patientVideoStyle}
            objectFit="cover"
          />
        </PatientVideoView>
      </MainView>

      <ButtonView>
        <TouchButton
          activeOpacity={0.9}
          onPress={() => {
            setIsFrontVideo(prev => !prev);
          }}>
          <TouchImage source={CameraImage} resizeMode="contain" />
        </TouchButton>
        <TouchButton activeOpacity={0.9}>
          <TouchImage source={AudioOnImage} resizeMode="contain" />
        </TouchButton>
        <TouchButton
          activeOpacity={0.9}
          onPress={() => {
            setIsVideo(prev => !prev);
          }}>
          <TouchImage
            source={isVideo ? VideoOnImage : VideoOffImage}
            resizeMode="contain"
          />
        </TouchButton>
      </ButtonView>
    </VideoChatView>
  );
};

const VideoChatView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.white};
`;

const ExitView = styled.View`
  flex: 0.1;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 10px;
`;

const ExitButton = styled.TouchableOpacity`
  width: 76px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.color['red-200']};
`;

const ExitText = styled.Text`
  width: 50px;
  height: 27px;
  font-size: 18px;
  color: ${({theme}) => theme.color.white};
`;

const MainView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  padding-right: 32px;
  padding-left: 32px;
`;

const DoctorNameView = styled.View`
  width: 76px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.color.black};
  border-radius: 8px;
  opacity: 0.65;
`;

const DoctorNameText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color.white};
`;

const PatientVideoView = styled.View`
  position: relative;
  height: 140px;
  width: 100px;
`;

const PatientNameView = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.color.black};
  opacity: 0.65;
  z-index: 1;
`;

const PatientNameText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color.white};
`;

const ButtonView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px 10px 64px 10px;
  background-color: ${({theme}) => theme.color.black};
  opacity: 0.8;
`;

const TouchButton = styled.TouchableOpacity``;

const TouchImage = styled.Image`
  height: 57;
`;

export default VideoChat;
