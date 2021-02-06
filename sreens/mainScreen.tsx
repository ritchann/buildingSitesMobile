import React, { useState } from "react";
import { View, StyleSheet, Text, Image, VirtualizedList } from "react-native";
import { Icon } from "react-native-elements";
import {
  Button,
  TextField,
  SearchField,
  TabButton,
  ListItem,
} from "../components";
const data: {
  title: string;
  address: string;
  iconName: string;
}[] = [
  {
    title: "СТРОИТЕЛЬНАЯ ПЛОЩАДКА",
    address: "Москва, улица Новая, дом 123",
    iconName: "tools",
  },
  {
    title: "СТРОИТЕЛЬНАЯ ПЛОЩАДКА",
    address: "Москва, улица Новая, дом 123",
    iconName: "tools",
  },
  {
    title: "СТРОИТЕЛЬНАЯ ПЛОЩАДКА",
    address: "Москва, улица Новая, дом 123",
    iconName: "tools",
  },
  {
    title: "СТРОИТЕЛЬНАЯ ПЛОЩАДКА",
    address: "Москва, улица Новая, дом 123",
    iconName: "tools",
  },
];
export const MainScreen = () => {
  const [test, setTest] = useState("test");
  const [tab, setTab] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.startWorkText}>Начать работу</Text>
        <Text style={styles.underStartWork}>Выберите площадку из списка</Text>
        <SearchField value={test} onChange={setTest} />
        <View
          style={{
            width: "75%",
            marginTop: "3%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TabButton
            active={tab}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  color={tab ? "#2E2E2E" : "#757575"}
                  size={12}
                  style={{ paddingRight: 4 }}
                  type="font-awesome-5"
                  name="clock"
                />
                <Text
                  style={{ color: tab ? "#2E2E2E" : "#757575", fontSize: 12 }}
                >
                  Открытые
                </Text>
              </View>
            }
            onPress={() => setTab(true)}
          />
          <TabButton
            active={!tab}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  color={!tab ? "#2E2E2E" : "#757575"}
                  size={12}
                  style={{ paddingRight: 4 }}
                  type="material"
                  name="near-me"
                />
                <Text
                  style={{ color: !tab ? "#2E2E2E" : "#757575", fontSize: 12 }}
                >
                  Ближайшие
                </Text>
              </View>
            }
            onPress={() => setTab(false)}
          />
        </View>
      </View>
      {/* <View style={styles.containerBottom}>
        <VirtualizedList
          data={data}
          initialNumToRender={4}
          renderItem={({ item }) => (
            <ListItem
              data={{
                title: "СТРОИТЕЛЬНАЯ ПЛОЩАДКА",
                address: "Москва, улица Новая, дом 123",
                iconName: "tools",
              }}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item: {
            title: string;
            address: string;
            iconName: string;
          }) => item.title}
          getItemCount={() => 10}
          getItem={(data, index) => data[index]}
        />
      </View> */}
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
    height: "25%",
  },
  startWorkText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  underStartWork: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#757575",
  },
  containerBottom: {
    width: "90%",
    height: "70%",
  },
});
