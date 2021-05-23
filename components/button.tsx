import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { THEME } from "../data/constants";

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  white?: boolean;
}

export const CustomButton: React.FC<Props> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  white,
}) => {
  return (
    <Button
      loadingProps={{ color: THEME.BLACK }}
      loading={loading}
      disabled={disabled}
      buttonStyle={[white ? styles.white : styles.containerButton]}
      containerStyle={[white ? styles.white : styles.containerButton]}
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
  white: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: THEME.YELLOW,
    borderWidth: 0.2,
  },
  textButton: {
    color: THEME.BLACK,
    fontSize: 15,
  },
});
