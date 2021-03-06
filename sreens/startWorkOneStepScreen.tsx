import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "../components";

export const StartWorkOneScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../image/startWork.png")} />
      <View style={styles.containerInfo}>
        <View style={styles.bottomContainer}>
          <Text style={styles.question}>
            Вы хотите начать работу на этом объекте?
          </Text>
          <Text style={styles.underQuestion}>Строительная площадка</Text>
          <Text style={styles.underQuestion}>Москва, улица Новая, дом 123</Text>
        </View>
        <Button title="Да, продолжить" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  containerInfo: {
    height: "100%",
    width: "80%",
  },
  bottomContainer: {
    marginTop: "8%",
    alignItems: "flex-start",
    marginBottom: "35%",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  underQuestion: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#757575",
  },
  image: {
    height: "55%",
    width: "100%",
    resizeMode: "stretch",
  },
});
