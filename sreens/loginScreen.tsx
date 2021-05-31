import React, { useCallback, useState } from "react";
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
import { Accelerometer } from "expo-sensors";

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

  const _subscribe = () => {
    let i = 0;
    let checkFirstMas: { index: number; data: number }[] = [];
    let checkSecondMas: { index: number; data: number; count: number }[] = [];
    let checkThreeMas: { index: number; count: number }[] = [];
    const minRes = 0.8; //0.5
    const maxRes = 1.2; //2
    const minHeight = 3; //7
    const maxHeight = 60;
    const checkSpeed = 400;
    const minIndex = (Math.sqrt((2 * minHeight) / 9.8) * 1000) / checkSpeed;
    const maxIndex = (Math.sqrt((2 * maxHeight) / 9.8) * 1000) / checkSpeed;
    const min3Step = 0.9;
    const max3Step = 1.1;
    const secondDownMin = (3 * 1000) / checkSpeed;
    const secondDownMax = (5 * 1000) / checkSpeed;
    console.log(minIndex, maxIndex);
    Accelerometer.addListener((accelerometerData) => {
      const x = accelerometerData.x;
      const y = accelerometerData.y;
      const z = accelerometerData.z;
      i++;
      const res = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
      console.log("result : ", res, " index: ", i);
      if (res <= minRes) {
        checkFirstMas.push({ data: res, index: i });
      }
      const deleteIndexFirst: number[] = [];
      checkFirstMas.forEach((x) => {
        if (i - x.index >= minIndex) {
          if (i - x.index > maxIndex) {
            deleteIndexFirst.push(x.index);
          } else {
            if (res >= maxRes) {
              deleteIndexFirst.push(x.index);
              checkSecondMas.push({ data: res, index: i, count: 0 });
            }
          }
        }
      });
      checkFirstMas = checkFirstMas.filter(
        (item) => !deleteIndexFirst.includes(item.index)
      );

      checkSecondMas = checkSecondMas.flatMap((x) => {
        if (res >= min3Step && res <= max3Step) {
          if (i - x.index < secondDownMax) {
            return [{ ...x, count: x.count + 1 }];
          } else {
            if (x.count >= secondDownMin) {
              console.log("-----------fall-----------------");
            }
            return [];
          }
        } else {
          if (i - x.index < secondDownMax) {
            return [x];
          } else {
            if (x.count >= secondDownMin) {
              console.log("-----------fall-----------------");
            }
            return [];
          }
        }
      });

      console.log("checkFirstMas ", checkFirstMas);
      console.log("checkSecondMas", checkSecondMas);
      // console.log(
      //   "x: " + x + ",  y:  " + y + ",  z:  " + z + ",   res:  " + res
      // );
    });
  };

  const unsubscribe = () => {
    Accelerometer.removeAllListeners();
  };

  const subscribe = useCallback(() => {
    console.log("fall ------------------------------------------------------");
    Accelerometer.setUpdateInterval(400);
    _subscribe();
  }, []);

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
