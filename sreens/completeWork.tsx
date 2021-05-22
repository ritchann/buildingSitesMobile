import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Vibration,
  Modal,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import {
  createAccidentAsync,
  setStartWorkingHours,
  updateWorkingHoursAsync,
} from "../data/actions";
import { THEME } from "../data/constants";
import { DateTime } from "../utils/dateTime";
import { StatusWork } from "../utils/enums";
import * as Notifications from "expo-notifications";
import io from "socket.io-client";
import { Accident } from "../data/model";
import { CustomButton } from "../components";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(249, 200, 74, ${opacity})`,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const CompleteScreen = () => {
  let deviceHeight = Dimensions.get("window").height;
  let deviceWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const { startWorkingHours, siteList, user } = useSelector(
    (state: StoreType) => state.data
  );

  const currentSite = useMemo(
    () => siteList.find((x) => x.id == startWorkingHours?.siteId),
    [siteList, startWorkingHours]
  );

  const SERVER = "http://192.168.43.232:8080";

  const socket = io(SERVER, {
    transports: ["websocket"],
  });

  const createAccident = useCallback(() => {
    dispatch(
      createAccidentAsync({
        time: new Date(),
        workingHoursId: 92,
        lon: 56.1209,
        lat: 44.1234,
      })
    );
    setShowModal(true);
  }, [dispatch]);

  const time = useMemo(() => {
    if (startWorkingHours) {
      const from =
        startWorkingHours.start.getUTCHours() * 60 +
        startWorkingHours.start.getMinutes();
      const to =
        startWorkingHours.end.getUTCHours() * 60 +
        startWorkingHours.end.getMinutes();
      return to - from;
    }
    return 0;
  }, [startWorkingHours]);

  const data = useMemo(() => {
    return {
      labels: ["Hours"],
      data: [time / 480],
    };
  }, [time]);

  const end = useCallback(() => {
    if (startWorkingHours) {
      dispatch(
        updateWorkingHoursAsync({
          ...startWorkingHours,
          start: DateTime.addHours(startWorkingHours.start, -3),
          end: new Date(),
          status: StatusWork.End,
        })
      );
      dispatch(
        setStartWorkingHours({
          ...startWorkingHours,
          end: DateTime.addHours(new Date(), 3),
          status: StatusWork.End,
        })
      );
    }
  }, [dispatch, startWorkingHours]);

  useEffect(() => {
    const interval = setInterval(() => end(), 30000);
    return () => clearInterval(interval);
  }, [end]);

  const notifications = useCallback(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Сработал сигнал SOS 📣",
        body: "Проверьте работника: Иванов Иван Иванович",
      },
      trigger: {
        seconds: 5,
        channelId: "new-emails",
      },
    });
    Vibration.vibrate([1000, 2000, 1000, 2000]);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect to socket");
      socket.on("join", function (data) {
        console.log(data);
        const accident = data as Accident;
        notifications();
        console.log(user.id, data);
      });
    });
  }, [socket, notifications]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          marginTop: "5%",
          height: deviceHeight / 4.5,
        }}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  justifyContent: "flex-end",
                  width: "100%",
                  flexDirection: "row",
                }}
              ></View>
              <Text style={{ fontSize: 17 }}>
                {"Ваш сигнал SOS отправлен 📣"}
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View style={{ width: 80, marginTop: 30 }}>
                  <CustomButton
                    onPress={() => setShowModal(false)}
                    title={"Ок"}
                  ></CustomButton>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.completeWorkText}>Завершить работу</Text>
        <Text style={styles.startTimeWork}>
          Вы начали работу в{" "}
          {startWorkingHours
            ? DateTime.format(
                DateTime.addHours(startWorkingHours.start, -3),
                "HH:mm"
              )
            : ""}
        </Text>

        <View style={styles.containerAddress}>
          <Icon color="#DADADA" size={30} type="material" name="room" />
          <View style={{ flexDirection: "column", marginLeft: "3%" }}>
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              СТРОИТЕЛЬНАЯ ПЛОЩАДКА
            </Text>
            <Text style={styles.startTimeWork}>
              "{currentSite?.name}" {currentSite?.city}, улица{" "}
              {currentSite?.street}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerBottom}>
        <ProgressChart
          data={data}
          width={350}
          height={deviceHeight / 2.6}
          strokeWidth={4}
          radius={deviceWidth / 3.2}
          chartConfig={chartConfig}
          hideLegend
        />
        <View
          style={{
            marginTop: -deviceHeight / 3.8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={styles.countHours}>{(time / 60).toFixed(0)} часов</Text>
          <Text style={styles.countHours}>{(time % 60).toFixed(0)} минут</Text>
          <TouchableOpacity onPress={() => end()}>
            <Text
              style={{
                width: 150,
                fontSize: 14,
                fontWeight: "normal",
                color: THEME.GREY,
                textAlign: "center",
              }}
            >
              Нажмите, чтобы закончить смену
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: deviceHeight / 6,
          }}
        >
          <Text style={styles.sosText}>Удерживайте кнопку SOS</Text>
          <Text style={styles.sosText}>в течение 3 секунд</Text>
          <Text style={styles.sosText}>для отправки экстренного сообщения</Text>
        </View>
        <TouchableOpacity
          onLongPress={createAccident}
          delayLongPress={3000}
          style={{
            backgroundColor: "#F95F4A",
            height: deviceHeight / 6,
            width: deviceHeight / 6,
            borderRadius: 100,
            marginTop: deviceHeight / 35,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor: "white",
    height: "100%",
    justifyContent: "space-between",
  },
  completeWorkText: {
    fontSize: 26,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  startTimeWork: {
    fontSize: 14,
    fontWeight: "normal",
    color: THEME.GREY,
  },
  containerBottom: {
    width: "80%",
    height: "75%",
    flexDirection: "column",
    alignItems: "center",
  },
  containerAddress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "5%",
  },
  countHours: {
    color: "#F9D24A",
    fontSize: 28,
  },
  sosText: {
    fontSize: 14,
    fontWeight: "normal",
    color: THEME.GREY,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
    height: 150,
  },
});
