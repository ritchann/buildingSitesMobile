import React, { useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItemShift } from "../components";
import { StoreType } from "../core/rootReducer";
import { getWorkingHoursListAsync } from "../data/actions";
import { THEME } from "../data/constants";
import { DateTime } from "../utils/dateTime";

export const ShiftsScreen = () => {
  const dispatch = useDispatch();

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  const { user, workingHoursList } = useSelector(
    (state: StoreType) => state.data
  );

  const data = useMemo(() => {
    return workingHoursList
      .map((x) => ({
        ...x,
        start: DateTime.addHours(x.start, -3),
        end: DateTime.addHours(x.end, -3),
      }))
      // .filter(
      //   (x) =>
      //     DateTime.format(x.end, "isodate") ==
      //     DateTime.format(new Date(), "isodate")
      // )
      .sort((a, b) => (a.id < b.id ? 1 : -1));
  }, [workingHoursList]);

  useEffect(() => {
    dispatch(getWorkingHoursListAsync(user.id));
  }, [dispatch, user]);

  return workingHoursList.length == 0 ? (
    <View
      style={{
        width: "100%",
        height: "120%",
        backgroundColor: "white",
        marginTop: -100,
      }}
    >
      <Image
        style={{
          height: "90%",
          width: "100%",
          resizeMode: "contain",
          backgroundColor: "white",
        }}
        source={require("../image/splash.gif")}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.headerText}>Смены</Text>
      </View>
      <View
        style={{
          width: "90%",
          height: deviceHeight - 120,
          marginTop: 35,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ListItemShift
              onPress={() => {}}
              data={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor: "white",
  },
  containerTop: {
    width: "80%",
    marginTop: "5%",
    height: "5%",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  containerBottom: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    height: "90%",
  },
});
