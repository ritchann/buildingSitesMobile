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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../components";
import { checkPPEAsync, startWorkingHoursAsync } from "../data/actions";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StoreType } from "../core/rootReducer";
import { THEME } from "../data/constants";
import { PPE } from "../data/model";
import { Status } from "../enums/statusEnum";

interface Props {
  toNext: () => void;
}

enum Type {
  Progress = 0,
  Check = 1,
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

  const { currentSite, startWorkingHours, user } = useSelector((state: StoreType) => state.data);

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<Type>(Type.Progress);
  const [result, setResult] = useState<Result>(Result.None);

  let camera: Camera | null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (!hasPermission) setHasPermission(status === "granted");
    })();
  }, [hasPermission]);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    console.log(photo?.base64?.length);
    setShowModal(true);
    setStep(Type.Progress);
    checkPPE(photo.base64?.split("0") ?? []);
    setCapturedImage({
      height: photo.height,
      uri: photo.uri,
      width: photo.width,
    });
  };

  const checkPPE = useCallback(
    (base64: string[]) => {
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
    if (currentSite && startWorkingHours==undefined)
      dispatch(
        startWorkingHoursAsync({
          start: new Date(),
          end: new Date(),
          employeeId: user.id,
          siteId: currentSite.id,
          status: Status.Process,
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
  }, []);

  const imageModal = useMemo(() => {
    switch (result) {
      case Result.None:
        return require("../image/splash.gif");
      case Result.FaceNotRecognized:
      case Result.FaceNotRecognizedWithoutRequiredEquipment:
      case Result.WithoutRequiredEquipment:
        return require("../image/close.jpg");
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
        style={{ backgroundColor: "red" }}
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{textModal}</Text>
            <Image
              style={{
                marginTop: 30,
                height: 140,
                width: 140,
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
          resizeMode="stretch"
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            width: capturedImage.width * 1.5,
            height: capturedImage.height * 1.55,
            marginTop: 20,
            padding: 0,
          }}
        />
      ) : (
        <Camera
          pictureSize="320x240"
          ref={(r) => (camera = r)}
          style={{ width: "90%", height: "65%", marginTop: 20 }}
          type={Camera.Constants.Type.back}
        ></Camera>
      )}
      <View style={styles.bottomContainer}>
        <CustomButton
          title={capturedImage ? "Повторить" : "Сделать фото"}
          onPress={() =>
            capturedImage ? setCapturedImage(undefined) : takePicture()
          }
        />
        <View style={styles.nextButton}>
          <CustomButton
           // disabled={!capturedImage}
            title="Далее"
            // onPress={() => checkPPE([])}
            onPress={() => (start(), next())}
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
    width: 300,
    height: 300,
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
    marginTop: -20,
    alignContent: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: THEME.GREY,
    width: 265,
    textAlign: "center",
  },
});
