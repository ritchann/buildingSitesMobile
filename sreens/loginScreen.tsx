import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Button, TextField } from "../components";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface Props {
  setAuth: (value: boolean) => void;
  setReg: (value: boolean) => void;
}

export const LoginScreen: React.FC<Props> = ({ setAuth, setReg }) => {
  let deviceHeight = Dimensions.get("window").height;

  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: `${deviceHeight / 15}%`,
          width: "100%",
          resizeMode: "stretch",
        }}
        source={require("../image/main.png")}
      />
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
          <TouchableOpacity onPress={() => setReg(true)}>
            <Text style={styles.forgottenPassword}>{"Забыли пароль?"}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: `${deviceHeight / 70}%`,
            alignItems: "center",
          }}
        >
          <Button title="Войти" onPress={() => setAuth(true)} />
          <View style={styles.containerNewUser}>
            <Text style={styles.newUser}>Новый пользователь? </Text>
            <TouchableOpacity onPress={() => {}}>
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
    backgroundColor: "white",
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
});
// показать кликабельность линк, сделать регистрацию кликабельной

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 5 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [500, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
