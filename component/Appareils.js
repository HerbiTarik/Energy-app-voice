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

    const voiceTeleviseur = [
      ["allumer", "allume"],
      ["téléviseur", "télévision"],
    ];
    const voiceFenetre = [["ouvre", "ouvrir"], ["fenêtre"]];
    const voiceFour = [
      ["allumer", "allume"],
      ["four", "plaque chauffante"],
    ];
    const voiceLeds = [
      ["allumer", "allume"],
      ["led", "leds", "LED", "LEDs"],
    ];
    const voiceVentilateur = [
      ["déclencher", "déclenche", "allumer", "allume"],
      ["ventilateur", "ventilation"],
    ];

    if (item.id === 1) {
      const lumiereExist = containsWords(item.voix_detectee, voiceLumiere);
      if (lumiereExist) {
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
      if (televiseurExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 3) {
      const fenetreExist = containsWords(item.voix_detectee, voiceFenetre);
      if (fenetreExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 4) {
      const fourExist = containsWords(item.voix_detectee, voiceFour);
      if (fourExist) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }
    if (item.id === 5) {
      const ledsExist = containsWords(item.voix_detectee, voiceLeds);
      if (ledsExist) {
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
      if (ventilateurExist) {
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
          <Text className="text-center">{item.appareil}</Text>
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
