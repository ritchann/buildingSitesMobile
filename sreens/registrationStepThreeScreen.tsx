import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextField } from "../components";

export const RegistrationStepThreeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <TextField
          secureTextEntry
          value="123456789123"
          label="ПРИДУМАЙТЕ ПАРОЛЬ"
          onChange={() => {}}
        />
        <TextField
          secureTextEntry
          value="123456789123"
          label="ПОВТОРИТЕ ПАРОЛЬ"
          onChange={() => {}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Далее" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor:'white'
  },
  dataContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "80%",
  },
});
