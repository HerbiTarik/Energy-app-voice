import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#1C3732", "#060E10"]} // Les deux couleurs du dégradé
      className="flex-1 justify-center items-center"
      start={{ x: 1, y: 0 }} // Départ du coin supérieur droit
      end={{ x: 0, y: 1 }}
    ></LinearGradient>
  );
};

export default HomeScreen;
