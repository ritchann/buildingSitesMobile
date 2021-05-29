import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Vibration,
  Modal,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import {
  createAccidentAsync,
  setStartWorkingHours,
  updateWorkingHoursAsync,
} from "../data/actions";
import { THEME } from "../data/constants";
import { DateTime } from "../utils/dateTime";
import * as Notifications from "expo-notifications";
import io from "socket.io-client";
import { Accident } from "../data/model";
import { CustomButton, Map } from "../components";
import { Status } from "../enums/statusEnum";
import { useLocation } from "../hooks/useLocation";
import { useInWorkArea } from "../hooks/useInWorkArea";

export const Greeting: React.FC = ({}) => {
  const { startWorkingHours, siteList, user, location } = useSelector(
    (state: StoreType) => state.data
  );

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
