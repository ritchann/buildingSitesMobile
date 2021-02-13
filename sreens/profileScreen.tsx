import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Профиль</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
