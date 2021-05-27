import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, ListItemShift } from "../components";
import { ModalMessage } from "../components/modalMessage";
import { StoreType } from "../core/rootReducer";
import {
  getWorkingHoursListAsync,
  setStartWorkingHours,
} from "../data/actions";
import { THEME } from "../data/constants";
import { WorkingHours } from "../data/model";
import { Status } from "../enums/statusEnum";
import { DateTime } from "../utils/dateTime";

interface Props {
  toNext: () => void;
}

export const ShiftsScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const [showModal, setShowModal] = useState<{
    show: boolean;
    data?: WorkingHours;
  }>({ show: false });

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  const { user, workingHoursList } = useSelector(
    (state: StoreType) => state.data
  );

  const data = useMemo(() => {
    return (
      workingHoursList
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
        .sort((a, b) => (a.id < b.id ? 1 : -1))
    );
  }, [workingHoursList]);

  useEffect(() => {
    if (user.id != undefined) dispatch(getWorkingHoursListAsync(user.id));
  }, [dispatch, user]);

  const onClickYes = useCallback(() => {
    dispatch(setStartWorkingHours(showModal.data));
    setShowModal({ show: false, data: undefined });
    toNext();
  }, [dispatch, toNext]);

  const onClickItem = useCallback((item: WorkingHours) => {
    const dateItem = DateTime.format(item.start, "isodate");
    const currentDate = DateTime.format(new Date(), "isodate");
    if (currentDate == dateItem) {
      if (item.status == Status.Paused)
        setShowModal({ show: true, data: item });
      else {
        let status = "";
        if (item.status == Status.End) status = "завершена";
        if (item.status == Status.Process) status = "в процессе";
        setShowMessage({ show: true, message: "Смена " + status });
      }
    } else
      setShowMessage({
        show: true,
        message: "Выберите смену за сегодняшний день",
      });
  }, []);

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal.show && showModal.data != undefined}
        onRequestClose={() => {
          setShowModal({ show: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "column" }}>
              <Icon
                color={THEME.GREY}
                size={60}
                containerStyle={{ marginLeft: -5, marginRight: -8 }}
                type="font-awesome-5"
                name="running"
              />
              <Text style={{ fontSize: 17, marginTop: 10 }}>
                {"Хотите продолжить смену?"}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <View style={{ width: 100 }}>
                <CustomButton
                  white
                  onPress={() => setShowModal({ show: false, data: undefined })}
                  title={"Нет"}
                ></CustomButton>
              </View>
              <View style={{ width: 100 }}>
                <CustomButton onPress={onClickYes} title={"Да"}></CustomButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
            <ListItemShift onPress={() => onClickItem(item)} data={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <ModalMessage
        message={showMessage.message}
        visible={showMessage.show}
        onClose={() => setShowMessage({ show: false, message: "" })}
      ></ModalMessage>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
    width: 295,
    height: 250,
  },
});
