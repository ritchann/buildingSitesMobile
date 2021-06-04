import React, {
  StrictMode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  getAccidentsAsync,
  setStartWorkingHours,
  updateAccidentAsync,
  updateWorkingHoursAsync,
} from "../data/actions";
import { THEME } from "../data/constants";
import { DateTime } from "../utils/dateTime";
import * as Notifications from "expo-notifications";
import io from "socket.io-client";
import { Accident } from "../data/model";
import { CustomButton, Map } from "../components";
import { Status } from "../enums/statusEnum";
import { useLocation } from "../hooks/useLocation";
import { useInWorkArea } from "../hooks/useInWorkArea";
import { AccidentType } from "../enums/accidentType";

const SERVER = "https://building-test-123.herokuapp.com";
import { Accelerometer } from "expo-sensors";

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

interface Props {
  endShift: () => void;
}

export const CompleteScreen: React.FC<Props> = ({ endShift }) => {
  let deviceHeight = Dimensions.get("window").height;
  let deviceWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const getLocation = useLocation();
  const inWorkArea = useInWorkArea();

  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalWithMap, setShowModalWithMap] = useState<{
    accident?: Accident;
    show: boolean;
  }>({
    show: false,
  });
  const [pausedTime, setPausedTime] = useState(0);

  const { startWorkingHours, siteList, user, location } = useSelector(
    (state: StoreType) => state.data
  );

  const [test, setTest] = useState(startWorkingHours?.time ?? 0);

  const currentSite = useMemo(
    () => siteList.find((x) => x.id == startWorkingHours?.siteId),
    [siteList, startWorkingHours]
  );

  // const socket = io(SERVER, {
  //   port:'8080',
  //   transports: ["websocket"],
  // });

  // useEffect(() => {
  //   if (startWorkingHours?.status == Status.Paused && pausedTime == 0) {
  //     const currentTime = DateTime.addHours(new Date(), 3);
  //     console.log(
  //       "use effect status paused",
  //       currentTime,
  //       startWorkingHours.end
  //     );
  //     const from =
  //       startWorkingHours.end.getUTCHours() * 60 +
  //       startWorkingHours.end.getMinutes();
  //     const to = currentTime.getUTCHours() * 60 + currentTime.getMinutes();
  //     setPausedTime(to - from);
  //   }
  // }, [startWorkingHours]);

  const notifications = useCallback((data: Accident) => {
    setShowModalWithMap({ accident: data, show: true });
    Notifications.scheduleNotificationAsync({
      content: {
        title:
          data.type == AccidentType.Sos
            ? "Сработал сигнал SOS 📣"
            : "Поступил сигнал о падении 📣",
        body: `Сигнал поступил от работника: ${
          data.workingHours.employee.surname
        } ${data.workingHours.employee.name} ${
          data.workingHours.employee.patronymic
        }. Время сигнала: ${DateTime.format(data.time)}`,
      },
      trigger: {
        seconds: 5,
        channelId: "new-emails",
      },
    });
    Vibration.vibrate([1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000]);
  }, []);

  const getAccidents = useCallback(() => {
    if (startWorkingHours?.id != undefined)
      dispatch(
        getAccidentsAsync({
          workingHours: startWorkingHours,
          onResponseCallback: (list: Accident[]) => {
            console.log("accidents ", list.length, new Date());
            setAccidents(list);
            if (list.length > 0) notifications(list[0]);
          },
        })
      );
  }, [startWorkingHours, dispatch, notifications]);

  useEffect(() => {
    const interval = setInterval(() => getAccidents(), 20000);
    return () => clearInterval(interval);
  }, [getAccidents]);

  // useEffect(() => {
  //   setTimeout(() => setTest(test + 1), 60000);
  // }, [test]);

  useEffect(() => {
    const interval = setInterval(() => setTest(test + 1), 60000);
    return () => clearInterval(interval);
  }, [test]);

  useMemo(() => {
    console.log("TEST ", test, new Date());
  }, [test]);

  useEffect(() => {
    const interval = setInterval(() => setTest(test + 1), 60000);
    return () => clearInterval(interval);
  }, [test]);

  useEffect(() => {
    const interval = setInterval(() => getLocation(), 60000);
    return () => clearInterval(interval);
  }, []);

  const createAccident = useCallback(
    (type: number) => {
      if (startWorkingHours?.id != undefined)
        dispatch(
          createAccidentAsync({
            time: new Date(),
            workingHoursId: startWorkingHours?.id,
            lon: location.lon,
            lat: location.lat,
            reaction: false,
            type,
          })
        );
      setShowModal(true);
    },
    [dispatch, location, startWorkingHours]
  );

  useMemo(() => {
    console.log(
      "startWorkingHours start, end ",
      startWorkingHours?.start,
      startWorkingHours?.end
    );
  }, [startWorkingHours]);

  // const time = useMemo(() => {
  //   if (startWorkingHours) {
  //     const from =
  //       startWorkingHours.start.getUTCHours() * 60 +
  //       startWorkingHours.start.getMinutes();
  //     const to =
  //       startWorkingHours.end.getUTCHours() * 60 +
  //       startWorkingHours.end.getMinutes();
  //     const result = to - from;
  //     if (startWorkingHours.status == Status.Paused)
  //       return startWorkingHours.time;
  //     else return to - from - pausedTime;
  //   }
  //   return 0;
  // }, [startWorkingHours, pausedTime]);

  const data = useMemo(() => {
    return {
      labels: ["Hours"],
      data: [test > 480 ? 1 : test / 480],
    };
  }, [test]);

  const end = useCallback(
    (status: number) => {
      if (startWorkingHours) {
        dispatch(
          updateWorkingHoursAsync({
            ...startWorkingHours,
            //  start: DateTime.addHours(startWorkingHours.start, -3),
            end: DateTime.addHours(new Date(), 3),
            status,
            time: test,
          })
        );
        dispatch(
          setStartWorkingHours(
            status == Status.End
              ? undefined
              : {
                  ...startWorkingHours,
                  //  start: DateTime.addHours(startWorkingHours.start, -3),
                  end: DateTime.addHours(new Date(), 3),
                  status,
                  time: test,
                }
          )
        );
        if (Status.End == status) endShift();
      }
    },
    [dispatch, startWorkingHours, endShift, test]
  );

  useEffect(() => {
    if (currentSite)
      if (!inWorkArea(location.lat, location.lon, currentSite?.coords))
        end(Status.Paused);
  }, [location, currentSite, end]);

  useEffect(() => {
    const interval = setInterval(() => end(Status.Process), 30000);
    return () => clearInterval(interval);
  }, [end]);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connect to socket");
  //     socket.on("join", function (data) {
  //       console.log(data);
  //       const accident = data as Accident;
  //       notifications();
  //       setShowModalWithMap({ accident, show: true });
  //       console.log(user.id, data);
  //     });
  //   });
  // }, [socket, notifications]);

  const labelHours = useMemo(() => {
    const hours = parseInt((test / 60).toFixed(0));
    if (hours == 1) return "час";
    else if ([0, 5, 6, 7, 8, 9, 10].includes(hours)) return "часов";
    else if ([2, 3, 4].includes(hours)) return "часа";
    else return "час";
  }, [test]);

  const labelMinute = useMemo(() => {
    const hours = parseInt((test % 60).toFixed(0));
    if (hours == 1) return "минута";
    else if ([0, 5, 6, 7, 8, 9, 10].includes(hours)) return "минут";
    else if ([2, 3, 4].includes(hours)) return "минуты";
    else return "минут";
  }, [test]);

  const onReactAccident = useCallback(() => {
    if (showModalWithMap.accident)
      dispatch(
        updateAccidentAsync({ ...showModalWithMap.accident, reaction: true })
      );
    setShowModalWithMap({ show: false, accident: undefined });
  }, [showModalWithMap, dispatch]);

  const fall = useCallback(() => {
    console.log("----------fal------conole");
    createAccident(AccidentType.Fall);
  }, [createAccident]);

  const _subscribe = () => {
    let i = 0;
    let checkFirstMas: { index: number; data: number }[] = [];
    let checkSecondMas: { index: number; data: number; count: number }[] = [];
    let checkThreeMas: { index: number; count: number }[] = [];
    const minRes = 0.2;
    const maxRes = 2.5;
    const minHeight = 7;
    const maxHeight = 60;
    const checkSpeed = 600;
    const minIndex = (Math.sqrt((2 * minHeight) / 9.8) * 1000) / checkSpeed;
    const maxIndex = (Math.sqrt((2 * maxHeight) / 9.8) * 1000) / checkSpeed;
    const min3Step = 0.9;
    const max3Step = 1.1;
    const secondDownMin = (8 * 1000) / checkSpeed;
    const secondDownMax = (10 * 1000) / checkSpeed;
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
              fall();
            }
            return [];
          }
        } else {
          if (i - x.index < secondDownMax) {
            return [x];
          } else {
            if (x.count >= secondDownMin) {
              console.log("-----------fall-----------------");
              fall();
            }
            return [];
          }
        }
      });

      if (checkFirstMas.length > 0)
        console.log("checkFirstMas ", checkFirstMas);
      if (checkSecondMas.length > 0)
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
    Accelerometer.setUpdateInterval(600);
    unsubscribe();
  }, []);

  useEffect(() => {
    subscribe();
  }, [subscribe]);

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
          visible={showModalWithMap.show}
        >
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalViewMap,
                {
                  width: deviceHeight > 700 ? 360 : 320,
                  height: deviceHeight > 700 ? 550 : 535,
                },
              ]}
            >
              <View
                style={{
                  width: "95%",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 3,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#b9ec2e",
                      width: 18,
                      height: 18,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  ></View>
                  <Text>{"Ваше местоположение"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#e7322f",
                      width: 18,
                      height: 18,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  ></View>
                  <Text>{"Местоположение сигнала"}</Text>
                </View>
              </View>
              <Map accident={showModalWithMap.accident} location={location} />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View style={{ width: 80, marginTop: 30 }}>
                  <CustomButton
                    onPress={() => onReactAccident()}
                    title={"Ок"}
                  ></CustomButton>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  width: deviceHeight > 700 ? 320 : 300,
                  height: deviceHeight > 700 ? 150 : 130,
                },
              ]}
            >
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
          <Text style={styles.countHours}>
            {Math.floor(test / 60)} {labelHours}
          </Text>
          <Text style={styles.countHours}>
            {(test % 60).toFixed(0)} {labelMinute}
          </Text>
          <TouchableOpacity onPress={() => end(Status.End)}>
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
            marginTop: deviceHeight > 700 ? 150 : 80,
          }}
        >
          <Text style={styles.sosText}>Удерживайте кнопку SOS</Text>
          <Text style={styles.sosText}>в течение 3 секунд</Text>
          <Text style={styles.sosText}>для отправки экстренного сообщения</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onLongPress={() => createAccident(AccidentType.Sos)}
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
  },
  modalViewMap: {
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
  },
});
