import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import Voice from '@react-native-voice/voice';

const SpeechToText = () => {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState([]);
  const [buttonLabel, setButtonLabel] = useState('Start');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log(e);
    setStatus('recording');
    setButtonLabel('Stop');
    // Clear previous results when starting a new recognition session
    setResults([]);
  };

  const onSpeechEnd = (e) => {
    console.log(e);
    if (status !== 'stopped') {
      setStatus('idle');
      setButtonLabel('Start');
    }
  };

  const onSpeechResults = (e) => {
    console.log(e);
    setResults(e.value);
  };

  const toggleRecording = async () => {
    try {
      if (status === 'idle' || status === 'stopped') {
        await Voice.start('en-US');
        setStatus('recording');
        setButtonLabel('Stop');
        // Clear previous results when starting a new recognition session
        setResults([]);
      } else if (status === 'recording') {
        await Voice.pause();
        setStatus('paused');
        setButtonLabel('Resume');
      } else if (status === 'paused') {
        await Voice.resume();
        setStatus('recording');
        setButtonLabel('Stop');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setStatus('stopped');
      setButtonLabel('Start');
    } catch (error) {
      console.log(error);
    }
  };

  const cancelRecording = async () => {
    try {
      // Clear results manually
      setResults([]);
      await Voice.cancel();
      setStatus('idle');
      setButtonLabel('Start');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={{ color: 'black', alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
        Speech Recognition
      </Text>
      <TouchableOpacity
        style={{ alignSelf: 'center', marginTop: 20 }}
        onPress={status === 'stopped' ? toggleRecording : stopRecording}
      >
        <Image source={require('./mic.png')} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly' }}>
        <TouchableOpacity
          style={{
            width: '45%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'orange',
          }}
          onPress={cancelRecording}
        >
          <Text style={{ color: 'white' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: status === 'recording' ? 'red' : 'green',
          }}
          onPress={status === 'stopped' ? toggleRecording : stopRecording}
        >
          <Text style={{ color: 'white' }}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly' }}>
        <Text>Status: {status}</Text>
        <ScrollView>
          {results.map((item, index) => (
            <Text key={index} style={{ textAlign: 'center' }}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SpeechToText;
