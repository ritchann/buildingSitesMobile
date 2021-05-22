import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { THEME } from "../data/constants";

interface Props {
  loading?: boolean;
}

export const Map: React.FC<Props> = ({ loading }) => {
  return (
    <MapView
      minZoomLevel={4}
      region={{
        latitude: 56.32761,
        longitude: 44.004217,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      style={{ width: 1000, height: 500 }}
    >
      <Marker
        coordinate={{ latitude: 56.32761, longitude: 44.004217 }}
      ></Marker>
      <Marker
        pinColor="green"
        title={"Вы здесь"}
        coordinate={{ latitude: 56.327411, longitude: 44.003067 }}
      ></Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    width: "100%",
    backgroundColor: THEME.YELLOW,
    borderRadius: 20,
  },
  textButton: {
    color: THEME.BLACK,
    fontSize: 15,
  },
});
