import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DateField, TextField, CustomButton, SelectField } from "../components";
import { StoreType } from "../core/rootReducer";
import { updateUserAsync } from "../data/actions";
import { THEME } from "../data/constants";
import { Employee } from "../data/model";
import { Specialty } from "../enums/specialtyEnum";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  let deviceHeight = Dimensions.get("window").height;

  const { siteList, currentSite, user: storeUser } = useSelector(
    (state: StoreType) => state.data
  );

  const [user, setUser] = useState<Employee>(storeUser);

  const specialtyMap = new Map<number, string>(
    Specialty.all.map((x) => [x.id, x.name])
  );

  const onSave = useCallback(() => {
    dispatch(updateUserAsync(user));
  }, [dispatch, user]);

  const onChange = useCallback(
    (field: string, value: string | number) => {
      setUser({ ...user, [field]: value });
    },
    [user]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.startWorkText}>Профиль</Text>
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
        <SelectField
          options={specialtyMap}
          label="СПЕЦИАЛЬНОСТЬ"
          value={user.specialty}
          onChange={(v) => onChange("specialty", v)}
        />
        <TextField
          regexp={/^([0-9]{10}|[0-9]{12})$/}
          placeholder="0000000000"
          maxLength={10}
          keyboardType="decimal-pad"
          value={user.tin}
          label="ИНН"
          onChange={(v) => onChange("tin", v)}
        />
        <TextField
          placeholder="000-000-00000"
          regexp={/^(?:[- ]*\d){11}$/}
          maxLength={14}
          keyboardType="decimal-pad"
          value={user.inipa}
          label="СНИЛС"
          onChange={(v) => onChange("inipa", v)}
        />
        <TextField
          placeholder="+7(900)000-00-00"
          regexp={/^(\+7|8)(?:[-()]*\d){10}$/}
          maxLength={16}
          keyboardType="phone-pad"
          value={user.phoneNumber}
          label="НОМЕР ТЕЛЕФОНА"
          onChange={(v) => onChange("phoneNumber", v)}
        />
        <View style={styles.buttonContainer}>
          <CustomButton title="Сохранить" onPress={onSave} />
        </View>
      </View>
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
    marginTop: "5%",
  },
  dataContainer: {
    width: "80%",
  },
  buttonContainer: {
    marginTop: 50,
  },
});
