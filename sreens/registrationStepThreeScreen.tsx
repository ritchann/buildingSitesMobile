import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, TextField } from "../components";
import { ModalMessage } from "../components/modalMessage";
import { getError } from "../core/getError";
import { regexpEmail, regexpPassword } from "../core/objectConst";
import { StoreType } from "../core/rootReducer";
import { setUser, signUpAsync } from "../data/actions";
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
  const [showWarning, setShowWarning] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

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
  }, [dispatch, user, toNext]);

  const onClick = useCallback(() => {
    const result: string[] = [];
    if (!user.email.match(regexpEmail)) result.push("email");
    if (
      user.password == "" ||
      user.repeatedPassword == "" ||
      !user.password?.match(regexpPassword)
    )
      result.push("пароль");
    const aboutPassword =
      user.password != user.repeatedPassword ? "Пароли не совпадают" : "";
    if (result.length > 0 || aboutPassword.length > 0) {
      setShowWarning({
        show: true,
        message:
          result.length > 0
            ? "Некоторые поля не заполнены или заполнены неверно: " +
              result.join(", ")
            : aboutPassword,
      });
    } else signUp();
  }, [signUp, user]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <TextField
          regexp={regexpEmail}
          value={user.email}
          label="EMAIL"
          keyboardType="email-address"
          onChange={(v) => onChange("email", v)}
        />
        <TextField
          regexp={regexpPassword}
          secureTextEntry
          value={user?.password ?? ""}
          label="ПРИДУМАЙТЕ ПАРОЛЬ"
          onChange={(v) => onChange("password", v)}
        />
        <TextField
          regexp={regexpPassword}
          secureTextEntry
          value={user?.repeatedPassword ?? ""}
          label="ПОВТОРИТЕ ПАРОЛЬ"
          onChange={(v) => onChange("repeatedPassword", v)}
        />
      </View>
      <View style={styles.containerError}>
        <Text style={styles.forgottenPassword}>{error}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton loading={load} title="Далее" onPress={onClick} />
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
