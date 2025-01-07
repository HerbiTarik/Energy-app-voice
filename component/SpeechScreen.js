import { View, Pressable, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import StartVoice from "../assets/StartVoice.png";
import StopVoice from "../assets/StopVoice2.png";
import ampoule from "../assets/ampoule.png";
import ampouleAlumee from "../assets/ampouleAlumee.png";
import Appareils from "./Appareils";
import axios from "axios";

const SpeechScreen = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lumiere, setLumiere] = useState(false);
  const [televiseur, setTeleviseur] = useState(false);
  const [fenetre, setFenetre] = useState(false);
  const [four, setFour] = useState(false);
  const [leds, setLeds] = useState(false);
  const [ventilateur, setVentilateur] = useState(false);

  // const containsWords = (text, wordGroups) => {
  //   return wordGroups.every((group) =>
  //     group.some((word) => text.includes(word))
  //   );
  // };

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

  const containsWords = (text, wordGroups) => {
    return wordGroups.every((group) =>
      group.some((word) => text.includes(word))
    );
  };

  const wordGroups = [
    ["Ok", "merci", "bonjour"], // Variantes de "allume"
  ];

  const lumiereExist = containsWords(transcript, wordGroups);
  console.log(lumiereExist);

  // const voiceLumiere = [];
  // const voiceTeleviseur = ["Téléviseur", "Télévision"];
  // const voiceFenetre = ["fenêtre"];
  // const voiceFour = ["four", "plaque chauffante"];
  // const voiceLeds = ["led", "leds"];
  // const voiceVentilateur = ["ventilateur", "ventilation"];

  // if (lumiereExist) {
  //   setLumiere(lumiereExist);
  // }
  // const televiseurExist = containsWords(transcript, voiceTeleviseur);
  // if (televiseurExist) {
  //   setTeleviseur(televiseurExist);
  // }
  // const fenetreExist = containsWords(transcript, voiceFenetre);
  // if (fenetreExist) {
  //   setFenetre(fenetreExist);
  // }
  // const fourExist = containsWords(transcript, voiceFour);
  // if (fourExist) {
  //   setFour(fourExist);
  // }
  // const ledsExist = containsWords(transcript, voiceLeds);
  // if (ledsExist) {
  //   setLeds(ledsExist);
  // }
  // const ventilateurExist = containsWords(transcript, voiceVentilateur);
  // if (ventilateurExist) {
  //   setVentilateur(ventilateurExist);
  // }

  // console.log(transcript);
  // console.log(lumiere);

  useEffect(() => {
    const data = {
      voix_detectee: transcript,
    };
    if (lumiereExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/3",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }
  }, [transcript]);

  return (
    <View className="flex-1">
      <View className="mb-20 mt-28 items-center">
        {!recognizing ? (
          <Pressable onPress={handleStart}>
            <Image source={StartVoice} className="w-40 h-40" />
          </Pressable>
        ) : (
          <Pressable onPress={() => ExpoSpeechRecognitionModule.stop()}>
            <Image source={StopVoice} className="w-40 h-40" />
          </Pressable>
        )}
      </View>

      <Appareils />
      <Text>{transcript}</Text>
    </View>
  );
};

export default SpeechScreen;
