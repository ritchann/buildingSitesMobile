import React, { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";
import { WorkingHours } from "../data/model";
import { Status } from "../enums/statusEnum";
import { DateTime } from "../utils/dateTime";

interface Props {
  onPress: () => void;
  data: WorkingHours;
}

export const ListItemShift: React.FC<Props> = ({ onPress, data }) => {
  const { siteList } = useSelector((state: StoreType) => state.data);

  const status = useMemo(()=>{
    switch(data.status){
      case Status.Process:
        return "В процессе"
      case Status.Paused:
        return "Приостановлена";
      case Status.End:
        return "Завершена"
    }
  },[])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: "#f6f6f6",
        height: 90,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        borderColor: "#f6f6f6",
        borderWidth: 0.7,
      }}
    >
      <View style={styles.containerIcon}>
        <Icon color="#171717" type="font-awesome-5" name="wrench" />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>
          {siteList.find((x) => x.id == data.siteId)?.name}
        </Text>
        <Text style={styles.address}>
          {DateTime.format(data.start)} - {DateTime.format(data.end)}
        </Text>
        <Text style={styles.address}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9D24A",
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: "5%",
  },
  containerInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "75%",
    marginLeft: "3%",
  },
  title: {
    color: THEME.BLACK,
    fontWeight: "bold",
    height: 26,
    fontSize: 16,
  },
  address: {
    color: "#979797",
    fontWeight: "normal",
    lineHeight: 18,
    fontSize: 12,
    width: "100%",
  },
});
