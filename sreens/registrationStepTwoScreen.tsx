import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  SelectField,
  TextField,
} from "../components";
import { StoreType } from "../core/rootReducer";
import { setUser } from "../data/actions";
import { Specialty } from "../enums/specialtyEnum";
import { regexpInipa, regexpTin, regexpPhone } from "../core/objectConst";
import { ModalMessage } from "../components/modalMessage";

interface Props {
  toNext: () => void;
}

export const RegistrationStepTwoScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

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

  const onClick = useCallback(() => {
    const result: string[] = [];
    if (!user.tin.match(regexpTin)) result.push("ИНН");
    if (!user.inipa.match(regexpInipa)) result.push("СНИЛС");
    if (!user.phoneNumber.match(regexpPhone)) result.push("Номер телефона");
    if (result.length > 0) {
      setShowWarning({
        show: true,
        message:
          "Некоторые поля не заполнены или заполнены неверно: " +
          result.join(", "),
      });
    } else toNext();
  }, [toNext, user]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <SelectField
          options={specialtyMap}
          label="СПЕЦИАЛЬНОСТЬ"
          value={user?.specialty ?? 0}
          onChange={(v) => onChange("specialty", v)}
        />
        <TextField
          regexp={regexpTin}
          placeholder="0000000000"
          maxLength={10}
          keyboardType="decimal-pad"
          value={user?.tin ?? ""}
          label="ИНН"
          onChange={(v) => onChange("tin", v)}
        />
        <TextField
          placeholder="000-000-00000"
          regexp={regexpInipa}
          maxLength={14}
          keyboardType="decimal-pad"
          value={user?.inipa ?? ""}
          label="СНИЛС"
          onChange={(v) => onChange("inipa", v)}
        />
        <TextField
          placeholder="+7(900)000-00-00"
          regexp={regexpPhone}
          maxLength={16}
          keyboardType="phone-pad"
          value={user?.phoneNumber ?? ""}
          label="НОМЕР ТЕЛЕФОНА"
          onChange={(v) => onChange("phoneNumber", v)}
        />
      </View>
      <View style={styles.buttonContainer}>
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
    marginTop: 110,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 230,
  },
});
