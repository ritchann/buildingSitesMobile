import React from "react";
import { View, StyleSheet, Text, Picker } from "react-native";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  options: Map<number, string>;
}

export const SelectField: React.FC<Props> = ({
  value,
  onChange,
  label,
  options,
}) => {
  return (
    <View style={styles.containerTextField}>
      <Text style={styles.textInput}>{label}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.input}
      >
        {Array.from(options).map(([key, name]) => (
          <Picker.Item key={key} label={name} value={key} />
        ))}
      </Picker>
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
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757575",
    marginLeft: -7,
    height: 30,
  },
  underline: {
    opacity: 0.2,
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: 1,
  },
});
