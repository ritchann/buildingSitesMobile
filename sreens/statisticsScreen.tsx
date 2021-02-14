import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TabButton } from "../components";
import { BarChart, LineChart } from "react-native-chart-kit";

const data = {
  labels: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
  datasets: [
    {
      data: [8, 9, 10, 8, 8, 9, 9],
    },
  ],
};

const dataSteps = {
  labels: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
  datasets: [
    {
      data: [2500, 5000, 10000, 4908, 2444, 2509, 1243],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#f6f6f6",
  backgroundGradientTo: "#f6f6f6",
  color: (opacity = 1) => `rgba(249, 210, 74, ${opacity})`,
  barPercentage: 0.8,
  fillShadowGradientOpacity: 100,
  decimalPlaces: 2,
  labelColor: () => `black`,
};

export const StatisticsScreen = () => {
  const [tab, setTab] = useState(true);
  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

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
            widthTab={150}
            active={tab}
            title={
              <Text
                style={{ color: tab ? "#2E2E2E" : "#757575", fontSize: 12 }}
              >
                За последнюю неделю
              </Text>
            }
            onPress={() => setTab(true)}
          />
          <TabButton
            widthTab={140}
            active={!tab}
            title={
              <Text
                style={{ color: !tab ? "#2E2E2E" : "#757575", fontSize: 12 }}
              >
                За последний месяц
              </Text>
            }
            onPress={() => setTab(false)}
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.chartText}>ОТРАБОТАННЫЕ ЧАСЫ</Text>
        <BarChart
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          showBarTops={true}
          withInnerLines
          style={{
            borderRadius: 16,
          }}
          data={data}
          width={deviceWidth - 55}
          height={deviceHeight / 3 - 15}
          chartConfig={chartConfig}
        />
        <Text style={styles.chartText}>АКТИВНОСТЬ</Text>
        <LineChart
          style={{
            borderRadius: 16,
          }}
          data={dataSteps}
          width={deviceWidth - 55}
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
