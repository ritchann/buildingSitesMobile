import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, TextField } from "../components";
import { getError } from "../core/getError";
import { StoreType } from "../core/rootReducer";
import { createUserAsync, setUser, signUpAsync } from "../data/actions";
import { THEME } from "../data/constants";
import { AuthResponse } from "../data/model";

interface Props {
  toNext: () => void;
}

export const RegistrationStepThreeScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreType) => state.data);

  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string>("");

  const onChange = useCallback(
    (field: string, value: string) => {
      dispatch(setUser({ ...user, [field]: value }));
    },
    [dispatch, user]
  );

  const signUp = useCallback(() => {
    setLoad(true);
    dispatch(
      signUpAsync({
        employee: user,
        onResponseCallback: (res: AuthResponse) => {
          setLoad(false);
          if (res.employee != null) {
            dispatch(setUser(res.employee));
            setError("");
            toNext();
          } else if (res.employee != "") setError(getError(res.error));
        },
      })
    );
  }, [dispatch, user]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <TextField
          value={user.email}
          label="EMAIL"
          onChange={(v) => onChange("email", v)}
        />
        <TextField
          regexp={/^(?=.*\d).{8,}$/}
          secureTextEntry
          value={user?.password ?? ""}
          label="ПРИДУМАЙТЕ ПАРОЛЬ"
          onChange={(v) => onChange("password", v)}
        />
        <TextField
          regexp={/^(?=.*\d).{8,}$/}
          secureTextEntry
          value={user?.repeatedPassword ?? ""}
          label="ПОВТОРИТЕ ПАРОЛЬ"
          onChange={(v) => onChange("password", v)}
        />
      </View>
      <View style={styles.containerError}>
        <Text style={styles.forgottenPassword}>{error}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton loading={load} title="Далее" onPress={() => signUp()} />
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
    marginTop: 110,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 220,
  },
  forgottenPassword: {
    color: THEME.GREY,
    fontSize: 12,
    paddingTop: "15%",
    fontWeight: "bold",
  },
  containerError: {
    alignItems: "center",
  },
});
