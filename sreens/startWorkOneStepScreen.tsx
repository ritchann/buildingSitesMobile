import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { CustomButton } from "../components";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";

interface Props {
  toNext: () => void;
}

export const StartWorkOneScreen: React.FC<Props> = ({ toNext }) => {
  let deviceHeight = Dimensions.get("window").height;

  const { siteList, currentSite } = useSelector(
    (state: StoreType) => state.data
  );
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../image/startWork.png")} />
      <View style={styles.containerInfo}>
        <View
          style={{
            marginTop: "8%",
            alignItems: "flex-start",
            marginBottom: `${deviceHeight / 30}%`,
          }}
        >
          <Text style={styles.question}>
            Вы хотите начать работу на этом объекте?
          </Text>
          <Text style={styles.underQuestion}>Строительная площадка</Text>
          <Text style={styles.underQuestion}>{currentSite?.city + ', улица '+ currentSite?.street}</Text>
        </View>
        <CustomButton title="Да, продолжить" onPress={toNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  containerInfo: {
    height: "100%",
    width: "80%",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  underQuestion: {
    fontSize: 18,
    fontWeight: "normal",
    color: THEME.GREY,
  },
  image: {
    height: "55%",
    width: "100%",
    resizeMode: "stretch",
  },
});
