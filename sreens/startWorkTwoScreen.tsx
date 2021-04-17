import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import { startWorkingHoursAsync } from "../data/actions";
import { StatusWork } from "../utils/enums";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StoreType } from "../core/rootReducer";

interface Props {
  toNext: () => void;
}

export const StartWorkTwoScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();

  const { currentSite } = useSelector((state: StoreType) => state.data);

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();
  let camera: Camera | null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (!hasPermission) setHasPermission(status === "granted");
    })();
  }, [hasPermission]);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setCapturedImage(photo);
  };

  const start = useCallback(() => {
    if (currentSite)
      dispatch(
        startWorkingHoursAsync({
          start: new Date(),
          end: new Date(),
          employeeId: 1,
          siteId: currentSite.id,
          status: StatusWork.Process,
          steps: 0,
        })
      );
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.question}>Пожалуйста, проверьте экипировку</Text>
      </View>
      {capturedImage ? (
        <ImageBackground
          resizeMode="stretch"
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            width: capturedImage.width / 8,
            height: capturedImage.height / 8,
            marginTop: 20,
            padding: 0,
          }}
        />
      ) : (
        <Camera
          ref={(r) => (camera = r)}
          style={{ width: "95%", height: "68%", marginTop: 20 }}
          type={Camera.Constants.Type.back}
        ></Camera>
      )}
      <View style={styles.bottomContainer}>
        <Button
          title={capturedImage ? "Повторить" : "Сделать фото"}
          onPress={() =>
            capturedImage ? setCapturedImage(undefined) : takePicture()
          }
        />
        <View style={styles.nextButton}>
          <Button title="Далее" onPress={() => (toNext(), start())} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  containerInfo: {
    width: "80%",
    marginTop: "5%",
  },
  bottomContainer: {
    marginTop: "5%",
    alignItems: "flex-start",
    marginBottom: "25%",
    width: "80%",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  nextButton: {
    marginTop: "2%",
    width: "100%",
  },
});
