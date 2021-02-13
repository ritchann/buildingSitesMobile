import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Icon } from "react-native-elements";

const data = {
  labels: ["Hours"],
  data: [0.625],
};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(249, 200, 74, ${opacity})`,
};

export const CompleteScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.completeWorkText}>Завершить работу</Text>
        <Text style={styles.startTimeWork}>Вы начали работу в 8:00</Text>
        <View style={styles.containerAddress}>
          <Icon color="#DADADA" size={30} type="material" name="room" />
          <View style={{ flexDirection: "column", marginLeft: "3%" }}>
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              СТРОИТЕЛЬНАЯ ПЛОЩАДКА
            </Text>
            <Text style={styles.startTimeWork}>
              Москва, улица Новая, дом 123
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <ProgressChart
          data={data}
          width={350}
          height={280}
          strokeWidth={4}
          radius={120}
          chartConfig={chartConfig}
          hideLegend
        />
        <View style={styles.containerHours}>
          <Text style={styles.countHours}>5 часов</Text>
          <TouchableOpacity onPress={() => console.log("click")}>
            <Text
              style={{
                width: 150,
                fontSize: 14,
                fontWeight: "normal",
                color: "#757575",
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
            marginTop: "50%",
          }}
        >
          <Text style={styles.sosText}>Удерживайте кнопку SOS</Text>
          <Text style={styles.sosText}>в течение 3 секунд</Text>
          <Text style={styles.sosText}>для отправки экстренного сообщения</Text>
        </View>
        <TouchableOpacity style={styles.containerSos}>
          <Text style={{ color: "white", fontSize: 30 }}>SOS</Text>
        </TouchableOpacity>
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
    height: "100%",
  },
  containerTop: {
    width: "80%",
    marginTop: "5%",
    height: "25%",
  },
  completeWorkText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  startTimeWork: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#757575",
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
    color: "#2E2E2E",
  },
  containerHours: {
    marginTop: "-58%",
    fontWeight: "500",
    flexDirection: "column",
    alignItems: "center",
  },
  countHours: {
    color: "#F9D24A",
    fontSize: 36,
  },
  sosText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#757575",
  },
  containerSos: {
    backgroundColor: "#F95F4A",
    height: 120,
    width: 120,
    borderRadius: 100,
    marginTop: "15%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
