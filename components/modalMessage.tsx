import React from "react";
import { StyleSheet, Modal, View, Text, Dimensions } from "react-native";
import { CustomButton } from ".";

interface Props {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export const ModalMessage: React.FC<Props> = ({
  visible,
  onClose,
  message,
}) => {
  let deviceHeight = Dimensions.get("window").height;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              width: deviceHeight > 700 ? 300 : 280,
              height: deviceHeight > 700 ? 220 : 200,
            },
          ]}
        >
          <Text style={styles.textMessage}>{message}</Text>
          <View style={styles.viewButton}>
            <View style={{ width: 90 }}>
              <CustomButton onPress={onClose} title="Ок"></CustomButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  textMessage: {
    fontSize: 17,
    textAlign: "center",
    height: "65%",
  },
  viewButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "8%",
  },
});
