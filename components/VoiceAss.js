import React, { useState } from "react";
import Voice from "@react-native-voice/voice";

function VoiceAss(props) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = (e) => setError(e.error);
  Voice.onSpeechResults = (r) => setResult(r.value[0]);
  const start = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      setError(error);
    }
  };
  const stop = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      setError(error);
    }
  };
  return <div></div>;
}

export default VoiceAss;
