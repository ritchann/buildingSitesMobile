import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { ContributionGraph, LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { getWorkingHoursListAsync } from "../data/actions";
import { WorkingHours } from "../data/model";
import { DateTime } from "../utils/dateTime";
import { THEME } from "../data/constants";
import { Accelerometer } from "expo-sensors";
import { CustomButton } from "../components";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity: number) => `rgba(249, 210, 74, ${opacity})`,
  barPercentage: 5,
  fillShadowGradientOpacity: 100,
  decimalPlaces: 2,
  labelColor: () => `black`,
};

export const StatisticsScreen = () => {
  const dispatch = useDispatch();

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  const { user, workingHoursList } = useSelector(
    (state: StoreType) => state.data
  );

  const getDifference = useCallback((data: WorkingHours) => {
    const from = data.start.getUTCHours() * 60 + data.start.getMinutes();
    const to = data.end.getUTCHours() * 60 + data.end.getMinutes();
    return to - from;
  }, []);

  const workingHoursWeek = useMemo(() => {
    const fromDate: Date = DateTime.addDays(new Date(), -8);
    const toDate: Date = DateTime.addHours(new Date(), 3);

    const res: WorkingHours[] = [];
    workingHoursList.forEach((x) => {
      if (
        x.start.getTime() >= fromDate.getTime() &&
        x.start.getTime() <= toDate.getTime()
      )
        res.push(x);
    });
    const data: number[] = [];
    const labels: string[] = [];
    res.forEach((x) => {
      if (!labels.includes(x.start.getDate().toString())) {
        labels.push(x.start.getDate().toString());
        data.push(x.time / 60);
      }
    });

    return {
      labels: labels.length > 0 ? labels : [""],
      datasets: [
        {
          data: data.length > 0 ? data : [0],
        },
      ],
    };
  }, [workingHoursList]);

  const contributionList = useMemo(() => {
    const data: { date: string; count: number }[] = [];

    const date: Date = new Date();
    const fromDate: Date = new Date(date.getFullYear(), date.getMonth(), 2);
    const toDate: Date = new Date(
      date.getFullYear(),
      date.getMonth(),
      DateTime.getDaysInMonth(date.getFullYear(), date.getMonth())
    );
    workingHoursList.forEach((x) => {
      const incl = data.some(
        (item) => item.date == DateTime.format(x.start, "isodate")
      );
      if (!incl)
        data.push({
          date: DateTime.format(x.start, "isodate"),
          count: x.time / 60,
        });
    });
    return data;
  }, [workingHoursList, getDifference]);

  const workingHoursMonth = useMemo(() => {
    const fromDate: Date = DateTime.addMonths(new Date(), -1);
    const toDate: Date = DateTime.addHours(new Date(), 3);
    const res: WorkingHours[] = [];
    workingHoursList.forEach((x) => {
      if (
        x.start.getTime() >= fromDate.getTime() &&
        x.start.getTime() <= toDate.getTime()
      )
        res.push(x);
    });
    const data: number[] = [];
    const labels: string[] = [];
    res.forEach((x) => {
      if (!labels.includes(x.start.getDate().toString())) {
        labels.push(x.start.getDate().toString());
        //data.push(getDifference(x) / 60);
        data.push(x.time / 60);
      }
    });
    return {
      labels: labels.length > 0 ? labels : [""],
      datasets: [
        {
          data: data.length > 0 ? data : [0],
        },
      ],
    };
  }, [workingHoursList]);

  useEffect(() => {
    if (user.id != undefined) dispatch(getWorkingHoursListAsync(user.id));
  }, [dispatch]);

  return workingHoursList.length == 0 ? (
    <View
      style={{
        width: "100%",
        height: "120%",
        backgroundColor: "white",
        marginTop: -100,
      }}
    >
      <Image
        style={{
          height: "90%",
          width: "100%",
          resizeMode: "contain",
          backgroundColor: "white",
        }}
        source={require("../image/splash.gif")}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.headerText}>Статистика</Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.chartText}>
          ОТРАБОТАННЫЕ ЧАСЫ ЗА ПОСЛЕДНЮЮ НЕДЕЛЮ
        </Text>
        {/* <ContributionGraph
        gutterSize={3}
        horizontal={false}
          showOutOfRangeDays={true}
          onDayPress={(x) => x.count}
          squareSize={20}
          titleForValue={(x) => "hello"}
          values={contributionList}
          endDate={
            new Date(new Date().getFullYear(), new Date().getMonth(), 30)
          }
          numDays={98}
          width={deviceWidth - 10}
          height={520}
          chartConfig={chartConfig}
        /> */}
        <LineChart
          bezier
          segments={6}
          verticalLabelRotation={-90}
          style={{
            marginLeft: -25,
          }}
          data={workingHoursWeek}
          width={deviceWidth - 35}
          withInnerLines
          height={deviceHeight / 3 - 15}
          chartConfig={chartConfig}
        />
        <Text style={styles.chartText}>
          ОТРАБОТАННЫЕ ЧАСЫ ЗА ПОСЛЕДНИЙ МЕСЯЦ
        </Text>
        <LineChart
          bezier
          verticalLabelRotation={-90}
          style={{
            marginLeft: -25,
          }}
          segments={6}
          data={workingHoursMonth}
          width={deviceWidth - 35}
          withInnerLines
          height={deviceHeight / 3 - 15}
          chartConfig={chartConfig}
        />
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
  },
  containerTop: {
    width: "80%",
    marginTop: "5%",
    height: "5%",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  containerBottom: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    height: "90%",
  },
  chartText: {
    color: THEME.BLACK,
    marginTop: "8%",
    marginBottom: "5%",
    fontSize: 12,
    fontWeight: "bold",
  },
});
