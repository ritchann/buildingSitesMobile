import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Button, TextField } from "../components";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../image/main.png")} />
      <View style={styles.textContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{"Добро пожаловать!"}</Text>
          <Text style={styles.underGreeting}>
            {"Войдите, чтобы продолжить"}
          </Text>
        </View>
        <TextField value="123-456-789 00" label="СНИЛС" onChange={() => {}} />
        <TextField
          secureTextEntry
          value="12345678"
          label="ПАРОЛЬ"
          onChange={() => {}}
        />

        <View style={styles.containerForgottenPassword}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgottenPassword}>{"Забыли пароль?"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <Button title="Войти" onPress={() => {}} />
          <View style={styles.containerNewUser}>
            <Text style={styles.newUser}>Новый пользователь? </Text>
            <TouchableOpacity onPress={() => console.log("click")}>
              <Text style={styles.register}> Регистрация</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  textContainer: {
    height: "100%",
    width: "80%",
  },
  greetingContainer: {
    marginTop: "8%",
    alignItems: "flex-start",
    marginBottom: "5%",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  underGreeting: {
    fontSize: 14,
    fontWeight: "400",
    color: "#757575",
  },
  forgottenPassword: {
    color: "#757575",
    fontSize: 12,
    paddingTop: "5%",
  },
  containerForgottenPassword: {
    alignItems: "flex-end",
  },
  containerButton: {
    marginTop: "15%",
    alignItems: "center",
  },
  newUser: {
    color: "#757575",
    fontSize: 12,
  },
  register: {
    fontSize: 12,
    zIndex: 10,
  },
  containerNewUser: {
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
    marginTop: "5%",
    alignContent: "center",
    fontSize: 12,
  },
  image: {
    height: "45%",
    width: "100%",
    resizeMode: "stretch",
  },
});
// показать кликабельность линк, сделать регистрацию кликабельной
