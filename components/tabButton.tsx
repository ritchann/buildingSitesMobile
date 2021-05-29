import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import { THEME } from "../data/constants";

interface Props {
  onPress: () => void;
  title: string;
  active: boolean;
  widthTab: number;
  nameIcon: string;
  type: string;
}

export const TabButton: React.FC<Props> = ({
  onPress,
  title,
  active,
  widthTab,
  nameIcon,
  type,
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
      <View style={styles.tab}>
        <Icon
          color={!active ? THEME.BLACK : THEME.GREY}
          size={12}
          style={{ paddingRight: 4 }}
          type={type}
          name={nameIcon}
        />
        <Text
          style={{
            color: !active ? THEME.BLACK : THEME.GREY,
            fontSize: 12,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    alignItems: "center",
  },
});
