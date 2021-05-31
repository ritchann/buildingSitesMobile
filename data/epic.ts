import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { from } from "rxjs";
import { ActionType } from "./actionType";
import {
  auth,
  checkPPE,
  createAccident,
  createUser,
  getAccidents,
  getSiteList,
  getWorkingHoursList,
  signOut,
  signUp,
  startWorkingHours,
  updateAccident,
  updateUser,
  updateWorkingHours,
} from "./api";
import { ignoreElements, map, mergeMap, tap } from "rxjs/operators";
import {
  setSiteList,
  setStartWorkingHours,
  setUser,
  setWorkingHoursList,
} from "./actions";
import { Action } from "redux";
import {
  Accident,
  AuthResponse,
  Employee,
  PPE,
  Site,
  WorkingHours,
} from "./model";
import { DateTime } from "../utils/dateTime";

const getSiteListEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETSITELISTASYNC),
    mergeMap((action) =>
      from(getSiteList((action as any).data)).pipe(
        tap(() => (action as any).data.onResponseCallback()),
        map((response) => {
          const list: Site[] = Array.from(response).map((x) => x as Site);
          return setSiteList(list);
        })
      )
    )
  );

const getWorkingHoursListEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETWORKINGHOURSLISTASYNC),
    mergeMap((action) =>
      from(getWorkingHoursList((action as any).data)).pipe(
        tap((response) => (action as any).data.onResponseCallback()),
        map((response) => {
          const list: WorkingHours[] = Array.from(response).map(
            (x) => x as WorkingHours
          );
          list.forEach((x) => {
            x.start = DateTime.addHours(x.start, -3);
            x.end = DateTime.addHours(x.end, -3);
          });
          list.sort((a, b) => (a.start.getTime() > b.start.getTime() ? 1 : -1));
          return setWorkingHoursList(list);
        })
      )
    )
  );

const startWorkingHoursEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.STARTWORKINGHOURSASYNC),
    mergeMap((action) =>
      from(startWorkingHours((action as any).data)).pipe(
        map((response) => {
          response.start = new Date(response?.start);
          response.end = new Date(response?.end);
          return setStartWorkingHours(response);
        })
      )
    )
  );

const createUserEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.CREATEUSERASYNC),
    mergeMap((action) =>
      from(createUser((action as any).data)).pipe(
        map((response) => {
          console.log(response);
          return setUser(response);
        })
      )
    )
  );

const updateWorkingHoursEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.UPDATEWORKINGHOURSASYNC),
    mergeMap((action) =>
      from(updateWorkingHours((action as any).data)).pipe(ignoreElements())
    )
  );

const updateUserEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.UPDATEUSERASYNC),
    mergeMap((action) =>
      from(updateUser((action as any).data)).pipe(
        tap(() => (action as any).data.onResponseCallback()),
        ignoreElements()
      )
    )
  );

const createAccidentEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.CREATEACCIDENTASYNC),
    mergeMap((action) =>
      from(createAccident((action as any).data)).pipe(ignoreElements())
    )
  );

const checkPPEEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.CHECKPPEASYNC),
    mergeMap((action) =>
      from(checkPPE((action as any).data)).pipe(
        tap((response: string) => {
          console.log("checkPPE ", response);
          const result = JSON.parse(
            response
              .replace(/True/g, "true")
              .replace(/'/g, '"')
              .replace(/False/g, "false")
              .replace(/'/g, '"')
          ) as PPE;
          return (action as any).data.onResponseCallback(result);
        }),
        ignoreElements()
      )
    )
  );

const authEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.AUTHASYNC),
    mergeMap((action) =>
      from(auth((action as any).data)).pipe(
        tap((response) => {
          const result = response as AuthResponse;
          return (action as any).data.onResponseCallback(result);
        }),
        ignoreElements()
      )
    )
  );

const signOutEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.SIGNOUTASYNC),
    mergeMap(() => from(signOut()).pipe(ignoreElements()))
  );

const signUpEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.SIGNUPASYNC),
    mergeMap((action) =>
      from(signUp((action as any).data)).pipe(
        tap((response) => {
          console.log(response)
          const result = response as AuthResponse;
          return (action as any).data.onResponseCallback(result);
        }),
        ignoreElements()
      )
    )
  );

const getAccidentsEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETACCIDENTSASYNC),
    mergeMap((action) =>
      from(getAccidents((action as any).data)).pipe(
        tap((response) => {
          const list: Accident[] = Array.from(response).map(
            (x) => x as Accident
          );
          list.forEach((x) => (x.time = new Date(x.time)));
          return (action as any).data.onResponseCallback(list);
        }),
        ignoreElements()
      )
    )
  );

const updateAccidentEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.UPDATEACCIDENTASYNC),
    mergeMap((action) =>
      from(updateAccident((action as any).data)).pipe(ignoreElements())
    )
  );

export const epic = combineEpics(
  getSiteListEpic,
  startWorkingHoursEpic,
  updateWorkingHoursEpic,
  createUserEpic,
  getWorkingHoursListEpic,
  updateUserEpic,
  createAccidentEpic,
  checkPPEEpic,
  authEpic,
  signOutEpic,
  signUpEpic,
  getAccidentsEpic,
  updateAccidentEpic
);
