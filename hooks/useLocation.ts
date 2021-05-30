import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../data/actions";
import * as Location from "expo-location";

export const useLocation = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status == "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log('get location', new Date())
        dispatch(
          setLocation({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
          })
        );
      }
    })();
  }, [dispatch]);
};
