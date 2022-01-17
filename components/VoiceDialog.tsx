import { Button, List, Modal, message, Drawer } from 'antd';
import React, { useState } from 'react';
import ErrorBoundry from './HOC/ErrorBoundy';
import {
  AudioOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { markdownToTxt } from 'markdown-to-txt';

interface Props {
  content: any;
}

type Voice = {
  voices: SpeechSynthesisVoice[] | [];
  isopen: boolean;
};

function VoiceDialog({ content }: Props) {
  const [voices, setVoices] = useState<Voice>({
    voices: [],
    isopen: false,
  });

  const [showControls, setShowControls] = useState<boolean>(false);
  const [showControlFab, setShowControlFab] = useState<boolean>(false);

  const audioBlogHandller = async () => {
    if ('speechSynthesis' in window) {
      if (voices.voices.length == 0) {
        let voices = [];
        voices = window.speechSynthesis.getVoices();
        setVoices({ voices: voices, isopen: true });
        window.speechSynthesis.onvoiceschanged = () => {
          let voices = [];
          voices = window.speechSynthesis.getVoices();
          setVoices({ voices: voices, isopen: true });
        };
      } else {
        setVoices((prev) => {
          return { voices: prev.voices, isopen: true };
        });
      }
    } else {
      console.log('Text-to-speech not supported.');
      message.error('Text-to Speech Not Suported in your system');
    }
  };

  const startSpeechHandller = (index: number) => {
    window.speechSynthesis.cancel();
    setVoices((prev) => {
      return { voices: prev.voices, isopen: false };
    });
    let speech = new SpeechSynthesisUtterance();
    setShowControls(true);
    setShowControlFab(true);
    speech.voice = voices.voices[index];
    speech.lang = 'en';
    speech.volume = 1;
    speech.text = markdownToTxt(content);
    window.speechSynthesis.speak(speech);
  };

  const onAudioCancel = () => {
    setVoices((prev) => {
      return { voices: prev.voices, isopen: false };
    });
  };

  const pauseAudioBook = () => {
    window.speechSynthesis.pause();
  };

  const playAudioBook = () => {
    window.speechSynthesis.resume();
  };

  const cancelAudioBook = () => {
    window.speechSynthesis.cancel();
    setShowControls(false);
    setShowControlFab(false);
  };

  return (
    <>
      {showControlFab && (
        <Button
          icon={<SettingOutlined />}
          size="large"
          shape="circle"
          type="primary"
          onClick={() => setShowControls(true)}
          style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1 }}
        />
      )}
      <Modal
        title="Choose Your Prefered Voice Listed Below"
        visible={voices.isopen}
        closable={false}
        onCancel={onAudioCancel}
      >
        <ErrorBoundry>
          <List
            dataSource={voices.voices}
            renderItem={(data, index) => {
              if (data.localService) {
                return (
                  <List.Item>
                    <Button key={index} type="text" onClick={() => startSpeechHandller(index)}>
                      {data.name}
                    </Button>
                  </List.Item>
                );
              }
            }}
          />
        </ErrorBoundry>
      </Modal>

      <Drawer
        title="Controls"
        placement="bottom"
        closable={true}
        visible={showControls}
        onClose={() => setShowControls(false)}
        height={150}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PauseCircleOutlined
            style={{ fontSize: '24px', marginLeft: '20px' }}
            onClick={pauseAudioBook}
          />
          <PlayCircleOutlined
            style={{ fontSize: '24px', marginLeft: '20px' }}
            onClick={playAudioBook}
          />
          <StopOutlined
            style={{ fontSize: '24px', marginLeft: '20px' }}
            onClick={cancelAudioBook}
          />
        </div>
      </Drawer>
      <Button size="large" shape="round" icon={<AudioOutlined />} onClick={audioBlogHandller}>
        Listen Blog
      </Button>
    </>
  );
}

export default VoiceDialog;
