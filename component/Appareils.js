import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import axios from "axios";
import { useSelector } from "react-redux";

const Appareils = () => {
  const voice = useSelector((state) => state.voice);
  const [devices, setDevices] = useState();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3001/api/devices");
        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, [voice]);

  console.log(voice);

  const renderItem = ({ item }) => {
    let imageUri = item.img;

    const containsWords = (text, wordGroups) => {
      return wordGroups.every((group) =>
        group.some((word) => text.includes(word))
      );
    };

    const voiceLumiere = [
      ["allumer", "allume"],
      ["ampoule", "lampe", "lumière", "l'ampoule"],
    ];

    const notVoiceLumiere = [
      ["pas allumer", "ne pas allumer", "n'allume"],
      ["ampoule", "lampe", "lumière", "l'ampoule"],
    ];

    const voiceTeleviseur = [
      ["allumer", "allume"],
      ["téléviseur", "télévision", "télé"],
    ];

    const notVoiceTeleviseur = [
      ["pas allumer", "ne pas allumer", "n'allume"],
      ["téléviseur", "télévision", "télé"],
    ];

    const voiceFenetre = [
      ["ouvre", "ouvrir"],
      ["fenêtre", "volets"],
    ];
    const notVoiceFenetre = [
      ["pas ouvrir", "n'ouvre pas", "n'ouvre"],
      ["fenêtre", "volets"],
    ];

    const voiceFour = [
      ["allumer", "allume"],
      ["four", "plaque chauffante"],
    ];
    const notVoiceFour = [
      ["pas allumer", "ne pas allumer", "n'allume"],
      ["four", "plaque chauffante"],
    ];

    const voiceLeds = [
      ["allumer", "allume"],
      ["led", "leds", "LED", "LEDs"],
    ];
    const notVoiceLeds = [
      ["pas allumer", "ne pas allumer", "n'allume"],
      ["led", "leds", "LED", "LEDs"],
    ];

    const voiceVentilateur = [
      ["déclencher", "déclenche", "allumer", "allume"],
      ["ventilateur", "ventilation", "climatiseur", "clim"],
    ];

    const notVoiceVentilateur = [
      [
        "pas déclencher",
        "ne déclenche",
        "pas allumer",
        "n'allume",
        "n'allume pas",
      ],
      ["ventilateur", "ventilation", "climatiseur", "clim"],
    ];

    if (item.id === 1) {
      const lumiereExist = containsWords(item.voix_detectee, voiceLumiere);
      const notLumiereExist = containsWords(
        item.voix_detectee,
        notVoiceLumiere
      );
      if (notLumiereExist) {
        imageUri = item.img;
      } else if (lumiereExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 2) {
      const televiseurExist = containsWords(
        item.voix_detectee,
        voiceTeleviseur
      );
      const notTeleviseurExist = containsWords(
        item.voix_detectee,
        notVoiceTeleviseur
      );
      if (notTeleviseurExist) {
        imageUri = item.img;
      } else if (televiseurExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 3) {
      const fenetreExist = containsWords(item.voix_detectee, voiceFenetre);
      const notFenetreExist = containsWords(
        item.voix_detectee,
        notVoiceFenetre
      );
      if (notFenetreExist) {
        imageUri = item.img;
      } else if (fenetreExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 4) {
      const fourExist = containsWords(item.voix_detectee, voiceFour);
      const notFourExist = containsWords(item.voix_detectee, notVoiceFour);
      if (notFourExist) {
        imageUri = item.img;
      } else if (fourExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 5) {
      const ledsExist = containsWords(item.voix_detectee, voiceLeds);
      const notLedsExist = containsWords(item.voix_detectee, notVoiceLeds);
      if (notLedsExist) {
        imageUri = item.img;
      } else if (ledsExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 6) {
      const ventilateurExist = containsWords(
        item.voix_detectee,
        voiceVentilateur
      );
      const notVentilateurExist = containsWords(
        item.voix_detectee,
        notVoiceVentilateur
      );
      if (notVentilateurExist) {
        imageUri = item.img;
      } else if (ventilateurExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }

    return (
      <BlurView
        intensity={80}
        className=" rounded-xl overflow-hidden p-5 flex-1 items-center justify-center m-5"
      >
        <View className="flex-1 justify-center items-center">
          <Image source={{ uri: imageUri }} className="w-24 h-24" />
          <Text className="text-center font-bold">{item.appareil}</Text>
        </View>
      </BlurView>
    );
  };

  return (
    <View className="flex-auto">
      <Text className="text-[24px] font-bold text-white leading-[45px] tracking-wider opacity-85 ml-5 mb-3">
        Appareils Connectés
      </Text>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default Appareils;
