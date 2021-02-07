import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { SearchField, TabButton, ListItem } from "../components";
import { data } from "./data";

export const MainScreen = () => {
  const [test, setTest] = useState("test");
  const [tab, setTab] = useState(true);
  const [selectedItem, setSelectedItem] = useState(1);
  
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
          widthTab={120}
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
                   widthTab={120}
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
      <View style={styles.containerBottom}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              selectedItem={selectedItem}
              onPress={() => setSelectedItem(item.id)}
              data={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
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
    height: "75%",
  },
});
