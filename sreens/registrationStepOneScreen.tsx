import React, { useCallback } from "react";
import { View, StyleSheet, Text, LogBox } from "react-native";
import { CustomButton, DateField, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { setUser } from "../data/actions";
import { THEME } from "../data/constants";

interface Props {
  toNext: () => void;
}

export const RegistrationStepOneScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreType) => state.data);

  LogBox.ignoreAllLogs();
  
  const onChange = useCallback(
    (field: string, value: string) => {
      dispatch(setUser({ ...user, [field]: value }));
    },
    [dispatch, user]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
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
      <View style={{
        width: "80%",marginTop:'10%'
      }}>
        <CustomButton title="Далее" onPress={toNext} />
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
