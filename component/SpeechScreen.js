import {
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { useState } from "react";
import React from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import StartVoice from "../assets/StartVoice.png";
import StopVoice from "../assets/StopVoice2.png";
import ampoule from "../assets/ampoule.png";
import ampouleAlumee from "../assets/ampouleAlumee.png";

const SpeechScreen = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  const containsWords = (text, wordGroups) => {
    return wordGroups.every((group) =>
      group.some((word) => text.includes(word))
    );
  };

  const wordGroups = [
    ["allume", "allumer"],
    ["lampe", "l'ampoule"],
  ];

  const displayImage = containsWords(transcript, wordGroups)
    ? ampouleAlumee
    : ampoule;

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "fr-FR",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  };

  return (
    <View className="flex-1 ">
      <View className="flex-1 mt-28">
        {!recognizing ? (
          <Pressable onPress={handleStart}>
            <Image source={StartVoice} className="w-40 h-40" />
          </Pressable>
        ) : (
          <Pressable onPress={() => ExpoSpeechRecognitionModule.stop()}>
            <Image source={StopVoice} className="w-40 h-40" />
          </Pressable>
        )}
        <View className="justify-center items-center mt-28">
          <Image source={displayImage} className="w-24 h-24" />
        </View>
      </View>
    </View>
  );
};

export default SpeechScreen;
