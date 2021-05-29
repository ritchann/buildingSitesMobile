import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, LogBox, Dimensions } from "react-native";
import { CustomButton, DateField, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { setUser } from "../data/actions";
import { THEME } from "../data/constants";
import { ModalMessage } from "../components/modalMessage";

interface Props {
  toNext: () => void;
}

export const RegistrationStepOneScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();

  let deviceHeight = Dimensions.get("window").height;
  const { user } = useSelector((state: StoreType) => state.data);

  const [showWarning, setShowWarning] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  LogBox.ignoreAllLogs();

  const onChange = useCallback(
    (field: string, value: string) => {
      dispatch(setUser({ ...user, [field]: value }));
    },
    [dispatch, user]
  );

  const onClick = useCallback(() => {
    const result: string[] = [];
    if (user.surname == "") result.push("фамилия");
    if (user.name == "") result.push("имя");
    if (user.patronymic == "") result.push("отчество");
    if (result.length > 0) {
      setShowWarning({
        show: true,
        message: "Некоторые поля не заполнены: " + result.join(", "),
      });
    } else toNext();
  }, [toNext, user]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          marginTop: deviceHeight > 700 ? 50 : 35,
        }}
      >
        <Text style={styles.manual}>Пожалуйста, заполните данные о себе</Text>
        <TextField
          value={user.surname}
          label="ФАМИЛИЯ"
          onChange={(v) => onChange("surname", v)}
        />
        <TextField
          value={user.name}
          label="ИМЯ"
          onChange={(v) => onChange("name", v)}
        />
        <TextField
          value={user.patronymic}
          label="ОТЧЕСТВО"
          onChange={(v) => onChange("patronymic", v)}
        />
        <DateField
          value={user.birthDate}
          label="ДАТА РОЖДЕНИЯ"
          onChange={(v) => onChange("birthDate", v)}
        />
      </View>
      <View
        style={{
          width: "80%",
          marginTop: deviceHeight > 700 ? 280 : 140,
        }}
      >
        <CustomButton title="Далее" onPress={onClick} />
      </View>
      <ModalMessage
        message={showWarning.message}
        visible={showWarning.show}
        onClose={() => setShowWarning({ show: false, message: "" })}
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
  dataContainer: {
    width: "80%",
    marginTop: 55,
  },
  manual: {
    fontSize: 20,
    color: THEME.BLACK,
    fontWeight: "bold",
  },
});
