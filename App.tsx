import React, { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./core/store";

import {
  StatisticsScreen,
  MainScreen,
  CompleteScreen,
  StartWorkOneScreen,
  RegistrationStepOneScreen,
  LoginScreen,
  RegistrationStepTwoScreen,
  RegistrationStepThreeScreen,
  StartWorkTwoScreen,
  ProfileScreen,
  ShiftsScreen,
  Greeting,
} from "./sreens";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { THEME } from "./data/constants";
import { signOutAsync } from "./data/actions";

const MenuBar = (props: any) => {
  let deviceHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: deviceHeight / 12,
        justifyContent: "flex-end",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{ marginLeft: 40 }}
        onPress={() => props.navigation.openDrawer()}
      >
        <Image
          source={require("./image/menu.jpg")}
          style={{
            opacity: 0.7,
            width: 22,
            height: 22,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function Profile(props: any) {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <MenuBar {...props} />
      <ProfileScreen />
    </View>
  );
}

function Statistics(props: any) {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <MenuBar {...props} />
      <StatisticsScreen />
    </View>
  );
}

const Drawer = createDrawerNavigator();

enum Action {
  Registration = 0,
  Auth = 1,
  None = 2,
}

enum ActionStartWork {
  Check = 0,
  Start = 1,
  None = 2,
}

export default function App() {
  const [auth, setAuth] = useState(Action.None);
  const [stepReg, setStepReg] = useState(1);
  const [startWork, setStartWork] = useState(ActionStartWork.None);
  const [stepStart, setStepStart] = useState(1);

  let deviceHeight = Dimensions.get("window").height;

  function Shifts(props: any) {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <MenuBar {...props} />
        <ShiftsScreen
          toNext={() => {
            setStartWork(ActionStartWork.Check);
            setStepStart(1);
            props.navigation.jumpTo("Главная")
          }}
        />
      </View>
    );
  }

  function Main(props: any) {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <MenuBar {...props} />
        {startWork === ActionStartWork.Start && (
          <CompleteScreen
            endShift={() => (
              setAuth(Action.Auth),
              setStartWork(ActionStartWork.None),
              setStepStart(1)
            )}
          />
        )}
        {startWork === ActionStartWork.None && (
          <MainScreen toNext={() => setStartWork(ActionStartWork.Check)} />
        )}
      </View>
    );
  }

  const CloseNextStartWorkBar = (props: any) => {
    return (
      <View
        style={{
          flexDirection: "column",
          height: `${deviceHeight > 700 ? 10 : 12}%`,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: "97%",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 40, paddingBottom: 15 }}
            onPress={() =>
              stepStart > 1
                ? setStepStart(stepStart - 1)
                : setStartWork(ActionStartWork.None)
            }
          >
            <Icon size={20} type="ionicon" name="arrow-back-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 40, paddingBottom: 15 }}
            onPress={() => (
              setStartWork(ActionStartWork.None), setStepStart(1)
            )}
          >
            <Icon size={20} type="ionicon" name="close-outline" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 3,
              backgroundColor: "#F9D24A",
              width: `${(100 / 2) * stepStart}%`,
            }}
          ></View>
          <View
            style={{ height: 3, backgroundColor: "#f1f1f1", width: "100%" }}
          ></View>
        </View>
      </View>
    );
  };

  const CloseNextBar = (props: any) => {
    return (
      <View
        style={{
          flexDirection: "column",
          height: deviceHeight > 700 ? 85 : 65,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: "97%",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 40, paddingBottom: 15 }}
            onPress={() =>
              stepReg > 1 ? setStepReg(stepReg - 1) : setAuth(Action.None)
            }
          >
            <Icon size={20} type="ionicon" name="arrow-back-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 40, paddingBottom: 15 }}
            onPress={() => setAuth(Action.None)}
          >
            <Icon size={20} type="ionicon" name="close-outline" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 3,
              backgroundColor: "#F9D24A",
              width: `${(100 / 3) * stepReg}%`,
            }}
          ></View>
          <View
            style={{ height: 3, backgroundColor: "#f1f1f1", width: "100%" }}
          ></View>
        </View>
      </View>
    );
  };

  function Registration(props: any) {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <CloseNextBar {...props} />
        {stepReg === 1 && (
          <RegistrationStepOneScreen toNext={() => setStepReg(stepReg + 1)} />
        )}
        {stepReg === 2 && (
          <RegistrationStepTwoScreen toNext={() => setStepReg(stepReg + 1)} />
        )}
        {stepReg === 3 && (
          <RegistrationStepThreeScreen toNext={() => setAuth(Action.Auth)} />
        )}
      </View>
    );
  }

  function StartWork(props: any) {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <CloseNextStartWorkBar {...props} />
        {stepStart === 1 && (
          <StartWorkOneScreen toNext={() => setStepStart(stepStart + 1)} />
        )}
        {stepStart === 2 && (
          <StartWorkTwoScreen
            toNext={() => setStartWork(ActionStartWork.Start)}
          />
        )}
      </View>
    );
  }

  function CustomDrawerContent(props: any) {
    let deviceHeight = Dimensions.get("window").height;
    const dispatch = useDispatch();
    return (
      <DrawerContentScrollView
        style={{ flex: 1, height: "100%", width: "100%" }}
        {...props}
      >
        <View
          style={{
            marginLeft: 40,
          }}
        >
          <View>
            <TouchableOpacity
              style={{}}
              onPress={() => props.navigation.closeDrawer()}
            >
              <Image
                source={require("./image/menu.jpg")}
                style={{
                  opacity: 0.7,
                  width: 22,
                  height: 22,
                  marginTop: deviceHeight / 90,
                }}
              />
            </TouchableOpacity>
            <Greeting/>
            <DrawerItemList
              inactiveTintColor={THEME.GREY}
              activeTintColor={THEME.BLACK}
              labelStyle={{ fontSize: 16 }}
              activeBackgroundColor="white"
              itemStyle={{ marginLeft: -1 }}
              {...props}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: `${
                deviceHeight > 700 ? 130 : 80
              }%`,
            }}
            onPress={() => (setAuth(Action.None), dispatch(signOutAsync()))}
          >
            <Text style={styles.exit}>ВЫЙТИ</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  }
  function MyDrawer() {
    let deviceWidth = Dimensions.get("window").width;

    return (
      <Drawer.Navigator
        drawerStyle={{ width: deviceWidth * 0.65, backgroundColor: "white" }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Icon
                color="#F9D24A"
                size={22}
                containerStyle={{ marginLeft: -5, marginRight: -8 }}
                type="font-awesome-5"
                name="home"
              />
            ),
          }}
          name="Главная"
          component={startWork === ActionStartWork.Check ? StartWork : Main}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Icon
                color="#F9D24A"
                size={22}
                containerStyle={{ marginLeft: -5, marginRight: -8 }}
                type="font-awesome-5"
                name="user-circle"
              />
            ),
          }}
          name="Профиль"
          component={Profile}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Icon
                color="#F9D24A"
                size={22}
                containerStyle={{ marginLeft: -5, marginRight: -8 }}
                type="font-awesome-5"
                name="chart-bar"
              />
            ),
          }}
          name="Статистика"
          component={Statistics}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Icon
                color="#F9D24A"
                size={22}
                containerStyle={{ marginLeft: -5, marginRight: -8 }}
                type="font-awesome-5"
                name="file-alt"
              />
            ),
          }}
          name="Смены"
          component={Shifts}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {auth === Action.Auth && <MyDrawer />}
        {auth === Action.Registration && <Registration />}
        {auth === Action.None && (
          <LoginScreen
            register={() => (setAuth(Action.Registration), setStepReg(1))}
            auth={() => (
              setAuth(Action.Auth),
              setStartWork(ActionStartWork.None),
              setStepStart(1)
            )}
          />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  greeting: {
    width: "80%",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "25%",
    marginBottom: "25%",
    color: THEME.BLACK,
  },
  exit: {
    fontWeight: "normal",
    color: THEME.GREY,
    fontSize: 14,
  },
});
