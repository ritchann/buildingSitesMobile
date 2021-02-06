import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, TextField } from "../components";

export const RegistrationStepOneScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.manual}>Пожалуйста, заполните данные о себе</Text>
        <TextField value="Иванов" label="ФАМИЛИЯ" onChange={() => {}} />
        <TextField value="Иван" label="ИМЯ" onChange={() => {}} />
        <TextField value="Иванович" label="ОТЧЕСТВО" onChange={() => {}} />
        <TextField
          value="01.01.1983"
          label="ДАТА РОЖДЕНИЯ"
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
  manual: {
    fontSize: 20,
    color: "#2E2E2E",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
  },
});
