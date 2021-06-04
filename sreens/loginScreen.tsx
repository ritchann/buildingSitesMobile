import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { CustomButton, TextField } from "../components";
import { authAsync, setUser } from "../data/actions";
import { THEME } from "../data/constants";

import { AuthResponse } from "../data/model";
import { getError } from "../core/getError";
import * as SecureStore from "expo-secure-store";
import * as Network from "expo-network";

interface Props {
  auth: () => void;
  register: () => void;
}

export const LoginScreen: React.FC<Props> = ({ auth, register }) => {
  let deviceHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [login, setLogin] = useState<{
    login: string;
    password: string;
  }>({
    login: "",
    password: "",
  });

  const setItemSecureStore = useCallback(
    (data: { login: string; password: string }) => {
      (async () => {
        await SecureStore.setItemAsync("login", data.login);
        await SecureStore.setItemAsync("password", data.password);
      })();
    },
    []
  );

  useEffect(() => {
    (async () => {
      const login = await SecureStore.getItemAsync("login");
      const password = await SecureStore.getItemAsync("password");
      if (login != null && password != null) setLogin({ login, password });
      console.log(login, password);
    })();
  }, [dispatch]);


  const authAction = useCallback(() => {
    console.log("auth");
    setLoad(true);
    dispatch(
      authAsync({
        login: login.login,
        password: login.password,
        onResponseCallback: (res: AuthResponse) => {
          setLoad(false);
          if (res.employee != null) {
            dispatch(setUser(res.employee));
            setError("");
            auth();
            setItemSecureStore(login);
          } else if (res.employee != "") setError(getError(res.error));
        },
      })
    );
  }, [dispatch, login]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: deviceHeight / 4.5,
          width: "100%",
          resizeMode: "stretch",
        }}
        source={require("../image/upImage.png")}
      />
      <View
        style={{
          height: deviceHeight / 1.7,
          width: "80%",
        }}
      >
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Добро пожаловать!</Text>
          <Text style={styles.underGreeting}>Войдите, чтобы продолжить</Text>
        </View>
        <TextField
          keyboardType="email-address"
          value={login.login}
          label="EMAIL"
          onChange={(v) => setLogin({ ...login, login: v })}
        />
        <TextField
          secureTextEntry
          value={login.password}
          label="ПАРОЛЬ"
          onChange={(password) => setLogin({ ...login, password })}
        />
        <View style={styles.containerError}>
          <Text style={styles.forgottenPassword}>{error}</Text>
        </View>
        <View
          style={{
            marginTop: `${deviceHeight / 35}%`,
          }}
        >
          <CustomButton title="Войти" loading={load} onPress={authAction} />
          <View style={styles.containerNewUser}>
            <Text style={styles.newUser}>Новый пользователь?</Text>
            <TouchableOpacity onPress={register}>
              <Text style={styles.register}> Регистрация</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Image
        style={{
          height: deviceHeight / 3.65,
          width: "100%",
          resizeMode: "stretch",
        }}
        source={require("../image/downImage.png")}
      />
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
  greetingContainer: {
    marginTop: "4%",
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
    fontWeight: "bold",
  },
  containerError: {
    alignItems: "center",
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
