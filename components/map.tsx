import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { THEME } from "../data/constants";
import { Accident } from "../data/model";

interface Props {
  location: { lon: number; lat: number };
  accident?: Accident;
}

export const Map: React.FC<Props> = ({ location, accident }) => {
  return (
    <MapView
      minZoomLevel={10}
      region={{
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      style={{ width: 300, height: 380 }}
    >
      <Marker
        title={"Сигнал SOS"}
        coordinate={{
          latitude: accident?.lat ? accident.lat - 0.00023 : 0,
          longitude: accident?.lon ?? 0,
        }}
      ></Marker>
      <Marker
        pinColor="#607c15"
        title={"Вы здесь"}
        coordinate={{
          latitude: location.lat,
          longitude: location.lon,
        }}
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
