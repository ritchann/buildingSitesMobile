import React, { useEffect } from "react";
import { View, StyleSheet, Text, LogBox } from "react-native";
import DatePicker from "react-native-datepicker";
import { THEME } from "../data/constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const DateField: React.FC<Props> = ({ value, onChange, label }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver`",
      "componentWillReceiveProps",
    ]);
  }, []);

  return (
    <View style={styles.containerTextField}>
      <Text style={styles.textInput}>{label}</Text>
      <DatePicker
        customStyles={{
          dateInput: { borderWidth: 0, marginLeft: -50 },
          dateText: {
            fontSize: 16,
            fontWeight: "300",
            color: THEME.GREY,
            margin: 0,
            padding: 0,
          },
        }}
        date={value}
        mode="date"
        format="DD.MM.YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={onChange}
      />
      <View style={styles.underline}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTextField: {
    width: "100%",
    marginTop: 20,
    flex: 0,
    justifyContent: "flex-start",
  },
  textInput: {
    fontSize: 12,
    fontWeight: "900",
    color: "#C7C7CC",
    borderColor: "#C7C7CC",
    marginBottom: -6,
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: THEME.GREY,
  },
  underline: {
    opacity: 0.2,
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: 1,
    marginTop: -5,
  },
});
