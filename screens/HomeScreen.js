import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import SpeechScreen from "../component/SpeechScreen";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#1C3732", "#060E10"]}
      className="flex-1 justify-center items-center"
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SpeechScreen />
    </LinearGradient>
  );
};

export default HomeScreen;
