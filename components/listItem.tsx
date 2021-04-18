import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { THEME } from "../data/constants";
import { Site } from "../data/model";

interface Props {
  onPress: () => void;
  data: Site;
  selectedItem: number;
}

export const ListItem: React.FC<Props> = ({ onPress, data, selectedItem }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: "#f6f6f6",
        height: 90,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        borderColor: selectedItem === data.id ? "#F9D24A" : "#f6f6f6",
        borderWidth: 0.7,
      }}
    >
      <View style={styles.containerIcon}>
        <Icon color="#171717" type="font-awesome-5" name="tools" />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.address}>
          {data.city}, улица {data.street}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9D24A",
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: "5%",
  },
  containerInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "75%",
    marginLeft: "3%",
  },
  title: {
    color: THEME.BLACK,
    fontWeight: "bold",
    height: 26,
    fontSize: 16,
  },
  address: {
    color: "#979797",
    fontWeight: "normal",
    lineHeight: 18,
    fontSize: 12,
    width: "100%",
  },
});
