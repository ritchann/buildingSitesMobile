import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TabButton } from "../components";
import { BarChart } from "react-native-chart-kit";

const data = {
  labels: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
  datasets: [
    {
      data: [8, 9, 10, 8, 8, 9, 9],
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

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.headerText}>Статистика</Text>
        <View
          style={{
            width: "100%",
            marginTop: "3%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TabButton
            widthTab={165}
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
            widthTab={155}
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
      <BarChart
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        showBarTops={true}
        withInnerLines
        style={{
          borderRadius: 16,
          marginRight: "10%",
          marginLeft: "10%",
        }}
        data={data}
        width={400}
        height={240}
        chartConfig={chartConfig}
      />
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
    height: "15%",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  containerBottom: {
    width: "90%",
    height: "75%",
  },
});
