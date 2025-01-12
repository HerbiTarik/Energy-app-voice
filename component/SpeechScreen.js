import { View, Pressable, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import StartVoice from "../assets/StartVoice.png";
import StopVoice from "../assets/StopVoice2.png";
import Appareils from "./Appareils";
import axios from "axios";
import { setVoice } from "../redux/voiceSlice";
import { useDispatch } from "react-redux";
import Options from "./Options";

const SpeechScreen = () => {
  const dispatch = useDispatch();
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [ecran, setEcran] = useState(true);

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

  const voiceLumiere = [["ampoule", "lampe", "lumière", "l'ampoule"]];
  const voiceTeleviseur = [["téléviseur", "télévision", "télé"]];
  const voiceFenetre = [["fenêtre", "volets"]];
  const voiceFour = [["four", "plaque chauffante"]];
  const voiceLeds = [["led", "leds", "LED", "LEDs"]];
  const voiceVentilateur = [
    ["ventilateur", "ventilation", "climatiseur", "clim"],
  ];
  const voiceTemp = [["température"]];
  const voiceHum = [["humidité"]];
  const voiceEng = [["panneau solaire", "panneaux solaires", "énergie"]];

  const lumiereExist = containsWords(transcript, voiceLumiere);
  const televiseurExist = containsWords(transcript, voiceTeleviseur);
  const fenetreExist = containsWords(transcript, voiceFenetre);
  const fourExist = containsWords(transcript, voiceFour);
  const ledsExist = containsWords(transcript, voiceLeds);
  const ventilateurExist = containsWords(transcript, voiceVentilateur);
  const tempExist = containsWords(transcript, voiceTemp);
  const humExist = containsWords(transcript, voiceHum);
  const engExist = containsWords(transcript, voiceEng);

  const dispatchVoice = (cmpExist, id) => {
    const data = {
      voix_detectee: transcript,
    };
    if (cmpExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            `http://10.0.2.2:3001/api/devices/${id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }
  };
  const dispatchVoiceToOptions = (optExist, id) => {
    const data = {
      voix_detectee: transcript,
    };
    if (optExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            `http://10.0.2.2:3001/api/options/${id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }
  };

  useEffect(() => {
    dispatchVoice(lumiereExist, 1);
    dispatchVoice(televiseurExist, 2);
    dispatchVoice(fenetreExist, 3);
    dispatchVoice(fourExist, 4);
    dispatchVoice(ledsExist, 5);
    dispatchVoice(ventilateurExist, 6);

    dispatchVoiceToOptions(tempExist, 1);
    dispatchVoiceToOptions(humExist, 2);
    dispatchVoiceToOptions(engExist, 3);
  }, [transcript]);

  useEffect(() => {
    dispatch(setVoice({ voice: transcript }));
  }, [transcript]);

  return (
    <View className="flex-1">
      <View className="mb-14 mt-20 items-center">
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
      <View className="flex-row justify-around items-center mb-10">
        <Pressable
          className="bg-[#FFC800] p-4 w-[40%] rounded-xl"
          onPress={() => setEcran(true)}
        >
          <Text className="text-center text-white">Appareils connectés</Text>
        </Pressable>

        <Pressable
          className="bg-[#FFC800] p-4 w-[40%] rounded-xl"
          onPress={() => setEcran(false)}
        >
          <Text className="text-center text-white">Caractéristiques</Text>
        </Pressable>
      </View>
      {ecran ? <Appareils /> : <Options />}
      {/* <Text className="text-white">{transcript}</Text> */}
    </View>
  );
};

export default SpeechScreen;
