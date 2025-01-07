import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import axios from "axios";

const Appareils = () => {
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
  }, []);

  const renderItem = ({ item }) => (
    <BlurView
      intensity={80}
      className=" rounded-xl overflow-hidden p-5 flex-1 items-center justify-center m-5"
    >
      <View className="flex-1 justify-center items-center">
        <Image source={{ uri: item.img }} className="w-24 h-24" />
        <Text className="text-center">{item.appareil}</Text>
      </View>
    </BlurView>
  );

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
