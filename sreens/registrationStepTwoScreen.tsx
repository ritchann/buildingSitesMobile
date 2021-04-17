import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, SelectField, TextField } from "../components";
import { StoreType } from "../core/rootReducer";
import { setUser } from "../data/actions";
import { Specialty } from "../enums/specialtyEnum";

interface Props {
  toNext: () => void;
}

export const RegistrationStepTwoScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreType) => state.data);

  const specialtyMap = new Map<number, string>(
    Specialty.all.map((x) => [x.id, x.name])
  );

  const onChange = useCallback(
    (field: string, value: string | number) => {
      dispatch(setUser({ ...user, [field]: value }));
    },
    [dispatch, user]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Далее" onPress={toNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    fontFamily: "Roboto",
    backgroundColor: "white",
  },
  dataContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "80%",
  },
});
