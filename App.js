import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NetInfo from "@react-native-community/netinfo";
import Planets from "./Planets";
import Films from "./Films";
import Spaceships from "./Spaceships";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const connectedMap = {
  none: "Disconnected",
  unknown: "Disconnected",
  wifi: "Connected",
  cell: "Connected",
  mobile: "Connected",
};

export default function App() {
  const [connected, setConnected] = useState("Checking network...");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(connectedMap[state.type] || "Disconnected");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {connected === "Connected" ? (
        Platform.OS === "ios" ? (
          <Tab.Navigator>
            <Tab.Screen name="Planets" component={Planets} />
            <Tab.Screen name="Films" component={Films} />
            <Tab.Screen name="Spaceships" component={Spaceships} />
          </Tab.Navigator>
        ) : (
          <Drawer.Navigator>
            <Drawer.Screen name="Planets" component={Planets} />
            <Drawer.Screen name="Films" component={Films} />
            <Drawer.Screen name="Spaceships" component={Spaceships} />
          </Drawer.Navigator>
        )
      ) : (
        <View style={styles.container}>
          <Text style={styles.message}>
            {connected === "Disconnected"
              ? "No network connection. Please check your internet settings."
              : connected}
          </Text>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "red",
  },
});




