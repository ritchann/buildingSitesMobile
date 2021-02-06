import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  onPress: () => void;
  title: JSX.Element;
  active: boolean;
}

export const TabButton: React.FC<Props> = ({ onPress, title, active }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 120,
        backgroundColor: active ? "#F9D24A" : "white",
        height: 25,
        borderRadius: 20,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderColor: active ? "#F9D24A" :"#e6e6e6",
        borderWidth: 1,
      }}
    >
      {title}
    </TouchableOpacity>
  );
};
