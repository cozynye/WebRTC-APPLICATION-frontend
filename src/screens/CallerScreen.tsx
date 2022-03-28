import React, {useEffect, useRef, useState} from 'react';
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
  RTCPeerConnectionConfiguration,
  RTCIceCandidateType,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import {View, ViewStyle} from 'react-native';
import {
  CameraImage,
  AudioOnImage,
  AudioOffImage,
  VideoOnImage,
  VideoOffImage,
} from 'assets/images/index';
import InCallManager from 'react-native-incall-manager';

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const TRUN_SERVER = 'turn:jeonhwageoleo.site:3478';
const SOCKET_URL = 'ws://52.22.1.183:8001/ws/call/test';

const configuration: RTCPeerConnectionConfiguration = {
  iceServers: [
    {
      urls: [TRUN_SERVER],
      username: 'jiyeon',
      credential: 'test4841',
    },
  ],
};

const VideoChat = ({navigation}: Props) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isFrontVideo, setIsFrontVideo] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const ws = useRef(new WebSocket(SOCKET_URL));

  const localPC = useRef(new RTCPeerConnection(configuration));

  useEffect(() => {
    ws.current.onopen = () => {
      console.log('signaling server start');
    };

    ws.current.onmessage = message => {
      const data = JSON.parse(message.data);
      console.log(`🔴 message data ${data.type}`);
      console.log(data);
      switch (data.type) {
        case 'call_received':
          //handleOffer(data.data.offer);
          break;
        case 'call_answered':
          handleAnswer(data.data);
          break;
        case 'ICEcandidate':
          localPC.current.addIceCandidate(data.data);
          break;
        default:
          break;
      }
    };
    ws.current.onerror = function (err) {
      console.log('Get error', err);
    };

    ws.current.onclose = () => {
      console.log('closed server');
    };
    initLocalVideo();
    registerPeer();
    setTimeout(() => {
      sendCall();
    }, 8000);

    InCallManager.start({media: 'audio', auto: true, ringback: ''});
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);
    // return () => {
    //   InCallManager.stop({busytone: ''});
    // };
  }, [isFrontVideo, isVideo]);

  const registerPeer = () => {
    localPC.current.onaddstream = event => {
      console.log('⭕️ addStream');
      console.log(event);
      console.log(localStream);
      console.log(remoteStream);
      setRemoteStream(event.stream);
    };

    localPC.current.onicecandidate = event => {
      if (event.candidate) {
        send({
          type: 'ICEcandidate',
          data: event.candidate,
        });
      }
    };
  };

  const initLocalVideo = () => {
    mediaDevices
      .getUserMedia({
        audio: isAudio,
        video: isVideo
          ? {facingMode: isFrontVideo ? 'user' : 'environment'}
          : false,
      })
      .then(stream => {
        setLocalStream(stream);
        localPC.current.addStream(stream);
      })
      .catch(error => {
        console.log('initLocalVideo error', error);
      });
  };

  const send = (message: Object) => {
    ws.current.send(JSON.stringify(message));
  };

  const sendCall = async () => {
    const offer = await localPC.current.createOffer();
    localPC.current.setLocalDescription(offer);
    console.log('offer보내기');
    send({
      type: 'offer',
      offer: offer,
    });
  };

  const handleOffer = async (offer: RTCSessionDescriptionType) => {
    try {
      localPC.current.setRemoteDescription(new RTCSessionDescription(offer));

      // const answer = await localPC.current.createAnswer();
      // localPC.current.setLocalDescription(answer);
    } catch (error) {
      console.log(`❌ handleoffer error, ${error}`);
    }
  };

  const handleAnswer = (answer: RTCSessionDescription) => {
    try {
      console.log('handleAnswer');
      localPC.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.log(`❌ handleAnswer error, ${error}`);
    }
  };

  return (
    <VideoChatView>
      <RTCView
        streamURL={localStream ? localStream.toURL() : ''}
        style={doctorVideoStyle}
        objectFit="cover"
      />
      <ExitView>
        <ExitButton onPress={sendCall}>
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
