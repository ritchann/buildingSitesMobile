import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Picker,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { THEME } from "../data/constants";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  options: Map<number, string>;
}

export const SelectField: React.FC<Props> = ({
  value,
  onChange,
  label,
  options,
}) => {
  const [showModal, setShowModal] = useState(false);

  const item = useCallback(
    (key: number) => {
      return (
        <View style={{ marginBottom: 2 }}>
          <View style={[styles.item, value == key ? styles.itemSelected : {}]}>
            <Text onPress={() => onChange(key)} style={styles.itemText}>
              {options.get(key)}
            </Text>
          </View>
        </View>
      );
    },
    [options]
  );

  return (
    <View style={styles.containerTextField}>
      <Text style={styles.textInput}>{label}</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: "flex-end",
                width: "100%",
                flexDirection: "row",
              }}
            ></View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {Array.from(options).map(([key]) => (
                <TouchableOpacity
                  onPress={() => (onChange(key), setShowModal(false))}
                  key={key}
                >
                  {item(key)}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.input}>{options.get(value)}</Text>
        <Icon
          iconStyle={{ color: THEME.GREY }}
          size={18}
          type="ionicon"
          name="chevron-down-outline"
        />
      </TouchableOpacity>
      <View style={styles.underline}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTextField: {
    width: "100%",
    marginTop: 20,
    flex: 0,
    justifyContent: "flex-start",
  },
  textInput: {
    fontSize: 12,
    fontWeight: "900",
    color: "#C7C7CC",
    borderColor: "#C7C7CC",
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: THEME.GREY,
    marginLeft: 4,
    height: 30,
  },
  underline: {
    opacity: 0.2,
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 380,
    height: 600,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    marginBottom: 2,
  },
  itemSelected: {
    backgroundColor: "#c4c4c41c",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "700",
  },
  underlineItem: {
    opacity: 0.2,
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: 1,
  },
});
