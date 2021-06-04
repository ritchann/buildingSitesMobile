import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";

export const Greeting: React.FC = ({}) => {
  const { user } = useSelector((state: StoreType) => state.data);

  const getGreeting = useCallback(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Доброе утро";
    else if (hours >= 12 && hours < 18) return "Добрый день";
    else if (hours >= 18) return "Добрый вечер";
    return "Добрый день";
  }, []);

  return (
    <View>
      <Text style={styles.greeting}>
        {getGreeting()}, {user.name}
      </Text>
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
