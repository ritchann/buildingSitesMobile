import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { from } from "rxjs";
import { ActionType } from "./actionType";
import { getSiteList } from "./api";
import { map, mergeMap } from "rxjs/operators";
import { setSiteList } from "./actions";
import { Action } from "redux";

const getSiteListEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETSITELISTASYNC),
    mergeMap(() =>
      from(getSiteList()).pipe(map((response) => setSiteList(response)))
    )
  );

// const setSiteEventEpic = (action$: ActionsObservable<any>) => {
//   return action$.pipe(
//     ofType(ActionType.SETSITEEVENTASYNC),
//     mergeMap((action) =>
//       from(setSiteEvent((action as any).data)).pipe(ignoreElements())
//     )
//   );
// };

// const setIncidentEpic = (action$: ActionsObservable<any>) => {
//   return action$.pipe(
//     ofType(ActionType.SETINCIDENT),
//     mergeMap((action) =>
//       from(setIncident((action as any).data)).pipe(ignoreElements())
//     )
//   );
// };

// const setPositionEpic = (action$: ActionsObservable<any>) => {
//   return action$.pipe(
//     ofType(ActionType.SETPOSITIONASYNC),
//     mergeMap((action) =>
//       from(setPosition((action as any).data)).pipe(ignoreElements())
//     )
//   );
// };

export const epic = combineEpics(getSiteListEpic);
