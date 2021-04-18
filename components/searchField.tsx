import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { THEME } from "../data/constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.containerTextField}>
      <TextInput
        selectionColor={THEME.GREY}
        style={styles.input}
        value={value}
        onChangeText={(value) => onChange(value)}
      />
      <View style={{ width: "8%" }}>
        <Icon
          color="#DADADA"
          style={{
            height: "100%",
            justifyContent: "center",
          }}
          size={16}
          type="font-awesome-5"
          name="search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTextField: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    height: 40,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    height: "100%",
    paddingLeft: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "300",
    color: THEME.GREY,
    width: "90%",
  },
});
