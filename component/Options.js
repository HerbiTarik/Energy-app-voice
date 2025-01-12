import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import axios from "axios";
import { useSelector } from "react-redux";

const Options = () => {
  const voice = useSelector((state) => state.voice);
  const [options, setOptions] = useState();

  // const extractNumbers = (text) => {
  //   const regex = /\d+/g; // L'expression régulière pour capturer tous les chiffres
  //   return text.match(regex); // Retourne un tableau de chiffres trouvés
  // };

  // console.log(voice.voice);
  // // Exemple d'utilisation
  // const phrase = voice.voice;
  // const numbers = extractNumbers(phrase);
  // console.log(numbers); // Affichera : ['15', '20']

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3001/api/options");
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, [voice]);

  const renderItem = ({ item }) => {
    let imageUri = item.img;

    const extractNumbers = (phrase) => {
      const wordsToNumber = {
        zéro: "0",
        un: "1",
        deux: "2",
        trois: "3",
        quatre: "4",
        cinq: "5",
        six: "6",
        sept: "7",
        huit: "8",
        neuf: "9",
      };

      // Séparer la phrase en mots
      const words = phrase.split(" ");

      // Extraire les chiffres, qu'ils soient en chiffres ou en lettres
      return words
        .map((word) => {
          // Si le mot est un chiffre en lettres, on le remplace par le chiffre correspondant
          if (wordsToNumber[word.toLowerCase()]) {
            return wordsToNumber[word.toLowerCase()];
          }
          // Si le mot est un chiffre, on le garde
          if (/\d/.test(word)) {
            return word;
          }
          // Sinon, on retourne null
          return null;
        })
        .filter(Boolean); // Filtrer les éléments null pour garder seulement les chiffres
    };

    const phrase = item.voix_detectee;
    const numbers = extractNumbers(phrase);
    console.log(numbers[0]); // Affichera : ["2", "3"]

    const containsWords = (text, wordGroups) => {
      return wordGroups.every((group) =>
        group.some((word) => text.includes(word))
      );
    };

    const voicePs = [
      ["activer", "active", "à"],
      ["panneaux solaires", "panneax solaire"],
    ];

    const notVoicePs = [
      ["pas activer", "ne pas activer", "n'active", "désactiver", "désactive"],
      ["panneaux solaires", "panneax solaire"],
    ];

    if (item.id === 3) {
      const PsExist = containsWords(item.voix_detectee, voicePs);
      const notPsExist = containsWords(item.voix_detectee, notVoicePs);
      if (notPsExist) {
        imageUri = item.img;
      } else if (PsExist || numbers[0]) {
        imageUri = item.img_v;
      } else {
        imageUri = item.img;
      }
    }

    return (
      <BlurView
        intensity={80}
        className=" rounded-xl overflow-hidden p-5 flex-1 m-5"
      >
        <View className="flex-row justify-between items-center">
          <Image source={{ uri: imageUri }} className="w-24 h-24" />
          <Text className="text-center text-[16px] text-[white] font-bold">
            {item.option}
          </Text>
          <Text className="text-center text-[16px] font-bold text-[white]">
            {numbers[0] ? numbers[0] : "0"} {item.mesure}
          </Text>
        </View>
      </BlurView>
    );
  };

  return (
    <View className="flex-auto">
      <Text className="text-[24px] font-bold text-white leading-[45px] tracking-wider opacity-85 ml-5 mb-3">
        Paramètres
      </Text>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Options;
