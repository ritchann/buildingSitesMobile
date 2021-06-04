import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../data/actions";
import * as Location from "expo-location";

export const useLocation = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status)
      if (status == "granted") {
        try{
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        console.log('get location', new Date())
        dispatch(
          setLocation({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
          })
        );
        }catch(e){
          console.log('Error')
        }
      }
    })();
  }, [dispatch]);
};
