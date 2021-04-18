import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button as ButtonElements } from "react-native-elements";

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  onPress,
  title,
  disabled = false,
}) => {
  return (
    <ButtonElements
      buttonStyle={styles.containerButton}
      containerStyle={styles.containerButton}
      title={title}
      onPress={onPress}
      titleStyle={styles.textButton}
    ></ButtonElements>
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
  textButtonDisabled: {
    color: "#2E2E2E",
    fontSize: 15,
    paddingBottom: 2,
    opacity: 0.5,
  },
  textButton: {
    color: "#2E2E2E",
    fontSize: 15,
    paddingBottom: 2,
  },
});
