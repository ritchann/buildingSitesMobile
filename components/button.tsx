import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { THEME } from "../data/constants";

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const CustomButton: React.FC<Props> = ({
  onPress,
  title,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      buttonStyle={styles.containerButton}
      containerStyle={styles.containerButton}
      title={title}
      onPress={onPress}
      titleStyle={styles.textButton}
    ></Button>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    width: "100%",
    backgroundColor: THEME.YELLOW,
    borderRadius: 20,
  },
  textButton: {
    color: THEME.BLACK,
    fontSize: 15,
  },
});
