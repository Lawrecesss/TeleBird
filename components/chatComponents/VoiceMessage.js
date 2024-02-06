import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { View, StyleSheet, Text, FlatList } from "react-native";
import IconButton from "../buttons/IconButton";
import { interpolate } from "react-native-reanimated";

function VoiceMessage({ voice, sender, user }) {
  const [voiceClip, setVoiceClip] = useState();
  const [playbackStatus, setPlaybackStatus] = useState({});
  const playing = playbackStatus.isPlaying;
  const currentDuration = playbackStatus.positionMillis;
  const totalDuration = playbackStatus.durationMillis;
  const progress = currentDuration / totalDuration;
  let voiceLines = [];
  let numberOfLines = 50;
  if (voice.loudness.length > numberOfLines) {
    for (let i = 0; i < numberOfLines; i++) {
      const index = Math.floor((i * voice.loudness.length) / numberOfLines);
      const nextIndex = Math.ceil(
        ((i + 1) * voice.loudness.length) / numberOfLines
      );
      const values = voice.loudness.slice(index, nextIndex);
      const average = values.reduce((sum, a) => sum + a, 0) / values.length;
      voiceLines.push(average);
    }
  } else {
    voice.loudness.map((item) => voiceLines.push(item));
  }

  useEffect(() => {
    loadVoice();
  }, [voice]);
  const loadVoice = async () => {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: voice.uri,
      },
      { progressUpdateIntervalMillis: 100 }
    );
    sound.setOnPlaybackStatusUpdate((status) => {
      setPlaybackStatus(status);
      if (status.didJustFinish) {
        sound.setPositionAsync(0);
      }
    });

    setVoiceClip(sound);
  };

  const play = async () => {
    console.log("Playing Sound");
    await voiceClip.playAsync();
  };

  const pause = async () => {
    console.log("stopped");
    voiceClip.pauseAsync();
  };
  useEffect(() => {
    return voiceClip
      ? () => {
          voiceClip.unloadAsync();
        }
      : undefined;
  }, [voiceClip]);
  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  return (
    <View style={styles.voiceContainer}>
      <IconButton
        name={playing ? "pause" : "play"}
        size={30}
        color={"black"}
        style={styles.icon}
        onPress={playing ? () => pause() : () => play(voice)}
      />
      <View style={styles.voiceComponent}>
        <FlatList
          style={styles.waves}
          data={voiceLines}
          horizontal
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.waveLine,
                {
                  height: interpolate(item, [-60, 0], [0, 100]),
                  backgroundColor:
                    progress > index / voiceLines.length
                      ? sender === user
                        ? "dodgerblue"
                        : "yellow"
                      : "black",
                },
              ]}
            />
          )}
        />
      </View>
      <Text style={styles.text}>
        {getDurationFormatted(totalDuration - currentDuration)}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  voiceComponent: {
    maxWidth: "70%",
    flexDirection: "row",
  },
  voiceContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  waves: {
    flexDirection: "row",
  },
  waveLine: {
    marginHorizontal: 0.5,
    alignSelf: "center",
    height: 30,
    width: 3,
    borderRadius: 30,
    backgroundColor: "black",
  },
});

export default VoiceMessage;
