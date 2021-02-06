import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  onPress: () => void;
  title: string;
}

export const Button: React.FC<Props> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerButton}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    width: "100%",
    backgroundColor: "#F9D24A",
    height: 40,
    borderRadius: 20,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#2E2E2E",
    fontSize: 15,
    paddingBottom: 2,
  },
});
