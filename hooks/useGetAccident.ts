import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useGetAccident = () => {
  const dispatch = useDispatch();

  return useCallback((x: number, y: number, coords: number[][]) => {
    console.log(x, y)
    let xp = coords.map(x=>x[0])
    let yp = coords.map(x=>x[1])
    const npol = xp.length;
    let j = npol - 1;
    let c = false;
    for (var i = 0; i < npol; i++) {
      if (
        ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
        x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
      ) {
        c = !c;
      }
      j = i;
    }
    console.log("in work area", c);
    return c;
  }, []);
};
