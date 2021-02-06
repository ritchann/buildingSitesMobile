import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextField } from "../components";

export const RegistrationStepTwoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <TextField
          value="Инженер-строитель"
          label="СПЕЦИАЛЬНОСТЬ"
          onChange={() => {}}
        />
        <TextField value="3664069397" label="ИНН" onChange={() => {}} />
        <TextField value="123-456-789 00" label="СНИЛС" onChange={() => {}} />
        <TextField
          value="+7 (901) 234-56-78"
          label="НОМЕР ТЕЛЕФОНА"
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
