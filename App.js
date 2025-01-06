import { Text, View } from "react-native";
import "./global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavScreen from "./component/NavScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <NavScreen />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
