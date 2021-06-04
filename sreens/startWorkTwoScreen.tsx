import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Modal,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../components";
import { checkPPEAsync, startWorkingHoursAsync } from "../data/actions";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";
import { PPE } from "../data/model";
import { Status } from "../enums/statusEnum";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import { DateTime } from "../utils/dateTime";

interface Props {
  toNext: () => void;
}

enum Type {
  Progress = 0,
  Check = 1,
}

enum CameraType {
  Back = "back",
  Front = "front",
}

enum Result {
  None,
  WithoutRequiredEquipment,
  WithRequiredEquipment,
  FaceNotRecognized,
  FaceNotRecognizedWithoutRequiredEquipment,
}

export const StartWorkTwoScreen: React.FC<Props> = ({ toNext }) => {
  const dispatch = useDispatch();
  let deviceHeight = Dimensions.get("window").height;

  const { currentSite, startWorkingHours, user } = useSelector(
    (state: StoreType) => state.data
  );

  const [cameraType, setCameraType] = useState(CameraType.Back);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<Type>(Type.Progress);
  const [result, setResult] = useState<Result>(Result.None);
  const [testMode] = useState(true);

  let camera: Camera | null;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (!hasPermission) setHasPermission(status === "granted");
    })();
  }, [hasPermission]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      // quality: 1,
    });
    if (!result.cancelled) {
      console.log(result.base64?.length);
      checkPPE(result?.base64 ?? "");
      setCapturedImage({
        height: result.height,
        uri: result.uri,
        width: result.width,
      });
    }
  };

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    console.log(photo.base64?.length);
    checkPPE(photo?.base64 ?? "");
    setCapturedImage({
      height: photo.height,
      uri: photo.uri,
      width: photo.width,
    });
  };

  const checkPPE = useCallback(
    (base64: string) => {
      setShowModal(true);
      setStep(Type.Progress);
      dispatch(
        checkPPEAsync({
          base64,
          onResponseCallback: (res: PPE) => {
            setStep(Type.Check);
            let face = false;
            let headCover = false;
            res.Persons.forEach((x) => {
              x.BodyParts.forEach((item) => {
                if (item.Name == "FACE") face = true;
                if (item.Name == "HEAD")
                  item.EquipmentDetections.forEach((eq) => {
                    if (eq.Type == "HEAD_COVER")
                      if (eq.CoversBodyPart.Confidence > 90) headCover = true;
                  });
              });
            });
            if (!face) {
              if (!headCover)
                setResult(Result.FaceNotRecognizedWithoutRequiredEquipment);
              else setResult(Result.FaceNotRecognized);
              setShowModalFalse();
            } else {
              if (headCover) {
                setResult(Result.WithRequiredEquipment);
                next();
              } else {
                setResult(Result.WithoutRequiredEquipment);
                setShowModalFalse();
              }
            }
          },
        })
      );
    },
    [dispatch]
  );

  const start = useCallback(() => {
    if (currentSite && startWorkingHours == undefined)
      dispatch(
        startWorkingHoursAsync({
          start: DateTime.addHours(new Date(), 3),
          end: DateTime.addHours(new Date(), 3),
          employeeId: user.id,
          siteId: currentSite.id,
          status: Status.Process,
          time: 0,
        })
      );
  }, [dispatch, user, currentSite, startWorkingHours]);

  const timeoutRef = useRef<any>(null);
  const timeoutRef1 = useRef<any>(null);

  const setShowModalFalse = useCallback(() => {
    timeoutRef1.current = setTimeout(() => {
      setResult(Result.None);
      setShowModal(false);
      setStep(Type.Progress);
      clearTimeout(timeoutRef1.current);
    }, 4000);
  }, []);

  const next = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowModal(false);
      start();
      toNext();
      clearTimeout(timeoutRef.current);
    }, 4000);
  }, [start, toNext]);

  const imageModal = useMemo(() => {
    switch (result) {
      case Result.None:
        return require("../image/splash.gif");
      case Result.FaceNotRecognized:
      case Result.FaceNotRecognizedWithoutRequiredEquipment:
      case Result.WithoutRequiredEquipment:
        return require("../image/alert.gif");
      case Result.WithRequiredEquipment:
        return require("../image/check.gif");
    }
  }, [result]);

  const textModal = useMemo(() => {
    switch (step) {
      case Type.Progress:
        return "Проводим проверку. Пожалуйста, подождите";
      case Type.Check: {
        switch (result) {
          case Result.None:
            return "";
          case Result.FaceNotRecognized:
            return "Лицо не распознано, пожалуйста, сделайте фото еще раз";
          case Result.FaceNotRecognizedWithoutRequiredEquipment:
            return "Лицо и каска не распознаны, пожалуйста, наденьте каску для начала смены, затем сделайте фото еще раз";
          case Result.WithRequiredEquipment:
            return "Проверка прошла успешно!";
          case Result.WithoutRequiredEquipment:
            return "Пожалуйста, наденьте каску для начала смены, затем сделайте фото еще раз";
        }
      }
    }
  }, [step, result]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.question}>Пожалуйста, проверьте экипировку</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                width: deviceHeight > 700 ? 300 : 290,
                height: deviceHeight > 700 ? 300 : 290,
              },
            ]}
          >
            <Text style={styles.modalText}>{textModal}</Text>
            <Image
              style={{
                marginTop: 10,
                height: 190,
                width: 190,
                resizeMode: "contain",
                backgroundColor: "white",
              }}
              source={imageModal}
            />
          </View>
        </View>
      </Modal>
      {capturedImage ? (
        <ImageBackground
          // resizeMode="stretch"
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            width: deviceHeight > 700 ? 370 : 290,
            height: deviceHeight > 700 ? 490 : 375,
            marginTop: 20,
          }}
        />
      ) : (
        <Camera
          pictureSize="3264x1836"
          ref={(r) => (camera = r)}
          style={{ width: deviceHeight >700? "90%":"80%", height: "65%", marginTop: 20 }}
          type={cameraType}
        ></Camera>
      )}
      {testMode && (
        <TouchableOpacity
          onPress={() =>
            setCameraType(
              cameraType == CameraType.Back ? CameraType.Front : CameraType.Back
            )
          }
          style={[styles.next, { marginLeft: deviceHeight > 700 ? 250 : 210 }]}
        >
          <Icon size={20} type="ionicon" name="sync-outline" />
        </TouchableOpacity>
      )}
      <View
        style={{
          marginTop: deviceHeight > 700 ? 50 : 30,
          alignItems: "flex-start",
          marginBottom: "25%",
          width: "80%",
        }}
      >
        <CustomButton
          title={capturedImage ? "Повторить" : "Сделать фото"}
          onPress={() =>
            capturedImage ? setCapturedImage(undefined) : takePicture()
          }
        />
        <View style={styles.nextButton}>
          <CustomButton
            // disabled={!capturedImage}
            title="Галерея"
            onPress={pickImage}
          />
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
    marginTop: "3%",
  },
  bottomContainer: {},
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME.BLACK,
  },
  nextButton: {
    marginTop: "2%",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  modalText: {
    // marginTop: 10,
    alignContent: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: THEME.GREY,
    width: 265,
    textAlign: "center",
  },
  next: {
    backgroundColor: THEME.YELLOW,
    height: 60,
    width: 60,
    borderRadius: 100,
    marginTop: -80,
    justifyContent: "center",
  },
});
