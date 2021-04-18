import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { SearchField, TabButton, ListItem } from "../components";
import { StoreType } from "../core/rootReducer";
import {
  createSiteAsync,
  getSiteListAsync,
  setCurrentSite,
} from "../data/actions";
import * as Location from "expo-location";
import { Site } from "../data/model";
import { THEME } from "../data/constants";

enum Tab {
  All,
  Near,
}
interface Props {
  toNext: () => void;
}

export const MainScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<number>(Tab.All);

  let deviceHeight = Dimensions.get("window").height;

  const { siteList, currentSite } = useSelector(
    (state: StoreType) => state.data
  );

  const test = useCallback(() => {
    // dispatch(
    //   createSiteAsync({
    //     coords: "[[0, 1]]",
    //     name: "test",
    //     city: "test",
    //     street: "test",
    //   })
    // );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSiteListAsync());
  }, [dispatch]);

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getDistance = useCallback((pointA: number[], pointB: number[]) => {
    return Math.sqrt(
      Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2)
    );
  }, []);

  const nearList = useMemo(() => {
    const result: Site[] = [];
    if (location) {
      siteList.forEach((x) => {
        let near = 2;
        x.coords.forEach((c) => {
          const distance = getDistance(c, [
            location.coords.latitude,
            location.coords.longitude,
          ]);
          if (near > distance) near = distance;
        });
        if (near < 0.01) result.push(x);
      });
    }
    return result;
  }, [siteList, location]);

  const data = useMemo(
    () =>
      tab == Tab.All
        ? siteList.flatMap((x) =>
            x.name.toLowerCase().includes(search.toLowerCase()) ? [x] : []
          )
        : nearList,
    [search, siteList, tab, nearList]
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          marginTop: "5%",
          height: deviceHeight / 4,
        }}
      >
        <Text style={styles.startWorkText}>Начать работу</Text>
        <Text style={styles.underStartWork}>Выберите площадку из списка</Text>
        <SearchField value={search} onChange={setSearch} />
        <View
          style={{
            marginTop: "3%",
            flexDirection: "row",
          }}
        >
          <TabButton
            widthTab={110}
            active={tab == Tab.All}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  color={tab ? THEME.BLACK : THEME.GREY}
                  size={12}
                  style={{ paddingRight: 4 }}
                  type="font-awesome-5"
                  name="clock"
                />
                <Text
                  style={{
                    color: tab ? THEME.BLACK : THEME.GREY,
                    fontSize: 12,
                  }}
                >
                  Все
                </Text>
              </View>
            }
            onPress={() => setTab(Tab.All)}
          />
          <TabButton
            widthTab={110}
            active={tab == Tab.Near}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  color={!tab ? THEME.BLACK : THEME.GREY}
                  size={12}
                  style={{ paddingRight: 4 }}
                  type="material"
                  name="near-me"
                />
                <Text
                  style={{
                    color: !tab ? THEME.BLACK : THEME.GREY,
                    fontSize: 12,
                  }}
                >
                  Ближайшие
                </Text>
              </View>
            }
            onPress={() => setTab(Tab.Near)}
          />
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: deviceHeight - 240,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              selectedItem={currentSite?.id ?? -1}
              onPress={() => dispatch(setCurrentSite(item))}
              data={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {currentSite && (
        <TouchableOpacity
          onPress={toNext}
          style={{
            backgroundColor: "#F9D24A",
            height: 60,
            width: 60,
            borderRadius: 100,
            marginTop: -100,
            marginLeft: 210,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} type="ionicon" name="arrow-forward-outline" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor: "white",
  },
  startWorkText: {
    fontSize: 26,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  underStartWork: {
    fontSize: 14,
    fontWeight: "normal",
    color: THEME.GREY,
  },
  containerBottom: {
    width: "90%",
    height: "65%",
  },
});
