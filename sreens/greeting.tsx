import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";

export const Greeting: React.FC = ({}) => {
  const { user } = useSelector((state: StoreType) => state.data);

  return (
    <View>
      <Text style={styles.greeting}>Добрый день, {user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    width: "80%",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "25%",
    marginBottom: "25%",
    color: THEME.BLACK,
  },
});
