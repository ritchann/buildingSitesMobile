import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, TextField } from "../components";
import { StoreType } from "../core/rootReducer";
import { createUserAsync, setUser } from "../data/actions";

interface Props {
  toNext: () => void;
}

export const RegistrationStepThreeScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreType) => state.data);

  const onChange = useCallback(
    (field: string, value: string) => {
      dispatch(setUser({ ...user, [field]: value }));
    },
    [dispatch, user]
  );

  const createUser = useCallback(() => {
    dispatch(createUserAsync(user));
    toNext();
  }, [dispatch, user]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <TextField
          value={user.login}
          label="ЛОГИН"
          onChange={(v) => onChange("login", v)}
        />
        <TextField
          regexp={/^(?=.*\d).{8,}$/}
          secureTextEntry
          value={user.password}
          label="ПРИДУМАЙТЕ ПАРОЛЬ"
          onChange={(v) => onChange("password", v)}
        />
        <TextField
          regexp={/^(?=.*\d).{8,}$/}
          secureTextEntry
          value={user.password}
          label="ПОВТОРИТЕ ПАРОЛЬ"
          onChange={(v) => onChange("password", v)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Далее" onPress={createUser} />
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
