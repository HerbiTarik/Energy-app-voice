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
import { setVoice } from "../redux/voiceSlice";
import { useDispatch } from "react-redux";

const SpeechScreen = () => {
  const dispatch = useDispatch();
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

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

  const voiceLumiere = [["ampoule", "lampe", "lumière", "l'ampoule"]];
  const voiceTeleviseur = [["téléviseur", "télévision"]];
  const voiceFenetre = [["fenêtre"]];
  const voiceFour = [["four", "plaque chauffante"]];
  const voiceLeds = [["led", "leds", "LED", "LEDs"]];
  const voiceVentilateur = [["ventilateur", "ventilation"]];

  const lumiereExist = containsWords(transcript, voiceLumiere);
  const televiseurExist = containsWords(transcript, voiceTeleviseur);
  const fenetreExist = containsWords(transcript, voiceFenetre);
  const fourExist = containsWords(transcript, voiceFour);
  const ledsExist = containsWords(transcript, voiceLeds);
  const ventilateurExist = containsWords(transcript, voiceVentilateur);

  useEffect(() => {
    const data = {
      voix_detectee: transcript,
    };
    if (lumiereExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/1",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }

    if (televiseurExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/2",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }

    if (fenetreExist) {
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
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }

    if (fourExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/4",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }

    if (ledsExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/5",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }

    if (ventilateurExist) {
      const updateDevices = async () => {
        try {
          const response = await axios.put(
            "http://10.0.2.2:3001/api/devices/6",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response.data);
            setTranscript("");
          }
        } catch (error) {
          console.error(error);
        }
      };
      updateDevices();
    }
  }, [transcript]);

  useEffect(() => {
    dispatch(setVoice({ voice: transcript }));
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
      {/* <Text className="text-white">{transcript}</Text> */}
    </View>
  );
};

export default SpeechScreen;
