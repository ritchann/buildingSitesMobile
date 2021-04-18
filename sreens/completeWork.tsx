import React, { useCallback, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { setStartWorkingHours, updateWorkingHoursAsync } from "../data/actions";
import { THEME } from "../data/constants";
import { DateTime } from "../utils/dateTime";
import { StatusWork } from "../utils/enums";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(249, 200, 74, ${opacity})`,
};

export const CompleteScreen = () => {
  let deviceHeight = Dimensions.get("window").height;
  let deviceWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const { startWorkingHours, siteList } = useSelector(
    (state: StoreType) => state.data
  );

  const currentSite = useMemo(
    () => siteList.find((x) => x.id == startWorkingHours?.siteId),
    [siteList, startWorkingHours]
  );

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

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          marginTop: "5%",
          height: deviceHeight / 4.5,
        }}
      >
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
    color: "#2E2E2E",
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
});
