import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomButton, TextField } from "../components";
import { THEME } from "../data/constants";

interface Props {
  auth: () => void;
  register: () => void;
}

export const LoginScreen: React.FC<Props> = ({ auth, register }) => {
  let deviceHeight = Dimensions.get("window").height;

  const [login, setLogin] = useState<{
    login: string;
    password: string;
  }>({
    login: "123-456-789 00",
    password: "12345678",
  });

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: `${deviceHeight / 16}%`,
          width: "100%",
          resizeMode: "stretch",
        }}
        source={require("../image/main.png")}
      />
      <View style={styles.infoContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Добро пожаловать!</Text>
          <Text style={styles.underGreeting}>Войдите, чтобы продолжить</Text>
        </View>
        <TextField
          value={login.login}
          label="СНИЛС"
          onChange={(v) => setLogin({ ...login, login: v })}
        />
        <TextField
          secureTextEntry
          value={login.password}
          label="ПАРОЛЬ"
          onChange={(password) => setLogin({ ...login, password })}
        />
        <View style={styles.containerForgottenPassword}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgottenPassword}>Забыли пароль?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: `${deviceHeight / 80}%`,
          }}
        >
          <CustomButton title="Войти" onPress={auth} />
          <View style={styles.containerNewUser}>
            <Text style={styles.newUser}>Новый пользователь?</Text>
            <TouchableOpacity onPress={register}>
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
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  infoContainer: {
    height: "100%",
    width: "80%",
  },
  greetingContainer: {
    marginTop: "6%",
    marginBottom: "5%",
  },
  greeting: {
    fontSize: 25,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  underGreeting: {
    fontSize: 14,
    fontWeight: "400",
    color: THEME.GREY,
  },
  forgottenPassword: {
    color: THEME.GREY,
    fontSize: 12,
    paddingTop: "6%",
  },
  containerForgottenPassword: {
    alignItems: "flex-end",
  },
  newUser: {
    color: THEME.GREY,
    fontSize: 12,
  },
  register: {
    fontSize: 12,
  },
  containerNewUser: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: "7%",
    fontSize: 12,
  },
});
