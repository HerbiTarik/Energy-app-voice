import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import startScreen from "../assets/3IQ_caAp.jpeg";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const StartScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={startScreen} className="flex-1" blurRadius={8}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SafeAreaView className="flex-1">
        <View className="items-start flex-auto justify-end ml-10 mr-10 mb-32">
          <View className=" my-16">
            <Text className="text-[28px] font-bold text-white leading-[45px] tracking-wider opacity-85">
              Explorez et prenez le contrôle de votre maison intelligente.
            </Text>
          </View>
          <View className="w-60 h-16 rounded-lg overflow-hidden justify-end">
            <BlurView intensity={80} className="flex-1">
              <Pressable
                className="flex-1 justify-center"
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text className="text-center text-white text-[20px] font-bold">
                  Get explore
                </Text>
              </Pressable>
            </BlurView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;
