import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TabButton } from "../components";
import { BarChart, LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { dispatch } from "rxjs/internal/observable/pairs";
import { getWorkingHoursListAsync } from "../data/actions";
import { WorkingHours } from "../data/model";
import { DaysWeek } from "../enums/daysWeek";
import { DateTime } from "../utils/dateTime";
import { Tooltip } from "react-native-elements";
import { THEME } from "../data/constants";

enum Type {
  Week,
  Month,
}

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(249, 210, 74, ${opacity})`,
  barPercentage: 0.5,
  fillShadowGradientOpacity: 100,
  decimalPlaces: 2,
  labelColor: () => `black`,
};

export const StatisticsScreen = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(Type.Week);

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  let tooltipRef = useRef<React.LegacyRef<Tooltip>>({ current: null });

  const { user, workingHoursList } = useSelector(
    (state: StoreType) => state.data
  );

  const getDifference = useCallback((data: WorkingHours) => {
    const from = data.start.getUTCHours() * 60 + data.start.getMinutes();
    const to = data.end.getUTCHours() * 60 + data.end.getMinutes();
    return to - from;
  }, []);

  const workingHours = useMemo(() => {
    const fromDate: Date =
      tab == Type.Week
        ? DateTime.addDays(new Date(), -8)
        : DateTime.addMonths(new Date(), -1);
    const toDate: Date = new Date();
    const res: WorkingHours[] = [];
    workingHoursList.forEach((x) => {
      if (
        x.start.getTime() >= fromDate.getTime() &&
        x.start.getTime() <= toDate.getTime()
      )
        res.push(x);
    });
    return res;
  }, [tab, workingHoursList]);

  useEffect(() => {
    dispatch(getWorkingHoursListAsync(user.id));
  }, [dispatch]);

  const dataHours = useMemo(() => {
    const data: number[] = [];
    const labels: string[] = [];
    workingHours.forEach((x) => {
      if (!labels.includes(x.start.getDate().toString())) {
        labels.push(x.start.getDate().toString());
        data.push(getDifference(x) / 60);
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
  }, [workingHours]);

  const dataSteps = useMemo(() => {
    const data: number[] = [];
    const labels: string[] = [];
    workingHours.forEach((x) => {
      if (!labels.includes(x.start.getDate().toString())) {
        labels.push(x.start.getDate().toString());
        data.push(x.steps);
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
  }, [workingHours]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.headerText}>Статистика</Text>
        <View
          style={{
            marginTop: "3%",
            flexDirection: "row",
          }}
        >
          <TabButton
            widthTab={163}
            active={tab == Type.Week}
            title={
              <Text
                style={{ color: tab ? "#2E2E2E" : THEME.GREY, fontSize: 12 }}
              >
                За последнюю неделю
              </Text>
            }
            onPress={() => setTab(Type.Week)}
          />
          <TabButton
            widthTab={148}
            active={tab == Type.Month}
            title={
              <Text
                style={{ color: !tab ? "#2E2E2E" : THEME.GREY, fontSize: 12 }}
              >
                За последний месяц
              </Text>
            }
            onPress={() => setTab(Type.Month)}
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.chartText}>ОТРАБОТАННЫЕ ЧАСЫ</Text>
        <BarChart
          verticalLabelRotation={-90}
          xAxisLabel=""
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          style={{
            marginLeft: -25,
          }}
          data={dataHours}
          width={deviceWidth - 35}
          height={deviceHeight / 3 - 15}
          chartConfig={chartConfig}
        />
        <Text style={styles.chartText}>АКТИВНОСТЬ</Text>
        <LineChart
          bezier
          verticalLabelRotation={-90}
          style={{
            marginLeft: -10,
          }}
          data={dataSteps}
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
    flex: 1,
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor: "white",
  },
  containerTop: {
    width: "80%",
    marginTop: "5%",
    height: "10%",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  containerBottom: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    height: "90%",
  },
  chartText: {
    color: "#2E2E2E",
    marginTop: "8%",
    marginBottom: "3%",
    fontSize: 12,
    fontWeight: "bold",
  },
});
