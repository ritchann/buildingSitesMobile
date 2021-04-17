import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  title: JSX.Element;
  active: boolean;
  widthTab: number;
}

export const TabButton: React.FC<Props> = ({
  onPress,
  title,
  active,
  widthTab,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: widthTab,
        backgroundColor: active ? "#F9D24A" : "white",
        height: 25,
        borderRadius: 20,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderColor: active ? "#F9D24A" : "#e6e6e6",
        borderWidth: 1,
        marginRight: "5%",
      }}
    >
      {title}
    </TouchableOpacity>
  );
};
