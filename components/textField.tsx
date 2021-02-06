import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  secureTextEntry?: boolean;
}

export const TextField: React.FC<Props> = ({
  value,
  onChange,
  label,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.containerTextField}>
      <Text style={styles.textInput}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
        onChangeText={(value) => onChange(value)}
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
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757575",
  },
  underline: {
    opacity: 0.2,
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: 1,
  },
});
