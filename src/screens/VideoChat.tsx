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
  AudioOffImage,
  VideoOnImage,
  VideoOffImage,
} from 'assets/images';

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
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isFrontVideo, setIsFrontVideo] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const initVideo = async () => {
    const configuration = {
      iceServers: [
        {
          urls: 'turn:jeonhwageoleo.site:3478',
          username: 'jiyeon',
          credential: 'test4841',
        },
      ],
      iceCandidatePoolSize: 10,
    };

    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);

    // const medias = await mediaDevices.enumerateDevices();

    const socket = new WebSocket('ws://192.168.0.176:8001/ws/call/test');

    socket.onopen = () => {
      console.log('open server');
    };
    socket.onmessage = (message: any) => {
      console.log('message1');
      console.log(message);
    };

    await mediaDevices.enumerateDevices();
    mediaDevices
      .getUserMedia({
        audio: isAudio,
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

    // 네트워크 정보 교환하기
    localPC.onicecandidate = e => {
      try {
        if (e.candidate) {
          socket.send(
            JSON.stringify({
              type: 'ICEcandidate',
              data: {
                message: e.candidate,
              },
            }),
          );
          socket.onmessage = async message => {
            const data = JSON.parse(message.data);
            if (data.type === 'ICEcandidate') {
              await localPC.addIceCandidate(data.message.candidate);
            }
          };
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    };
    try {
      //Offer SDP(Session Description Protocol) 생성 브라우저에서 사용하능한 코덱이나 해상도에 대한 정보
      const offer = await localPC.createOffer();
      console.log('Offer from localPC, setLocalDescription');

      console.log(offer);
      console.log('offer');
      await localPC.setLocalDescription(offer);

      // console.log('remotePC, setRemoteDescription');
      // await remotePC.setRemoteDescription(localPC.localDescription);
      // 현재 remote는 상대 session에 대한 정보를 알고 있고
      // console.log('RemotePC, createAnswer');
      //Answer SDP 를 생성하여 Signaling Channel 을 통해 local에게 전달
      // const answer = await remotePC.createAnswer();
      // console.log(`Answer from remotePC: ${answer.sdp}`);
      // console.log('remotePC, setLocalDescription');
      // await remotePC.setLocalDescription(answer);
      // console.log('localPC, setRemoteDescription');
      // await localPC.setRemoteDescription(remotePC.localDescription);

      socket.onclose = () => {
        console.log('closed server');
      };
    } catch (err) {
      console.error(err);
    }
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
          <DoctorNameText>Test1</DoctorNameText>
        </DoctorNameView>
        <PatientVideoView style={{borderRadius: 8, overflow: 'hidden'}}>
          <PatientNameView>
            <PatientNameText>Test2</PatientNameText>
          </PatientNameView>
          <RTCView
            streamURL={remoteStream ? remoteStream.toURL() : ''}
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
        <TouchButton
          activeOpacity={0.9}
          onPress={() => {
            setIsAudio(prev => !prev);
          }}>
          <TouchImage
            source={isAudio ? AudioOnImage : AudioOffImage}
            resizeMode="contain"
          />
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
