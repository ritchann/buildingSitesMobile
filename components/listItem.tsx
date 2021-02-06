import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface Props {
  onPress: () => void;
  data: {
    title: string;
    address: string;
    iconName: string;
  };
}

export const ListItem: React.FC<Props> = ({ onPress, data }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerItem}>
      <View style={styles.containerIcon}>
        <Icon color="#171717" type="font-awesome-5" name={data.iconName} />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.address}>{data.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    height: 90,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
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
    color: "#2E2E2E",
    fontWeight: "bold",
    lineHeight: 23,
    fontSize: 16,
  },
  address: {
    color: "#979797",
    fontWeight:'normal',
    lineHeight:16,
    fontSize:12
  },
});
