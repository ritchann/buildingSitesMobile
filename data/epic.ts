import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { from } from "rxjs";
import { ActionType } from "./actionType";
import {
  createSite,
  createUser,
  getSiteList,
  getWorkingHoursList,
  startWorkingHours,
  updateUser,
  updateWorkingHours,
} from "./api";
import { ignoreElements, map, mergeMap } from "rxjs/operators";
import {
  setSiteList,
  setStartWorkingHours,
  setUser,
  setWorkingHoursList,
} from "./actions";
import { Action } from "redux";
import { Site, WorkingHours } from "./model";
import { DateTime } from "../utils/dateTime";

const getSiteListEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETSITELISTASYNC),
    mergeMap(() =>
      from(getSiteList()).pipe(
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
        map((response) => {
          const list: WorkingHours[] = Array.from(response).map(
            (x) => x as WorkingHours
          );
          list.forEach((x) => {
            x.start = DateTime.addHours(x.start, 3);
            x.end = DateTime.addHours(x.end, 3);
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
          response.start = DateTime.addHours(response.start, 3);
          response.end = DateTime.addHours(response.end, 3);
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
        map((response) => setUser(response))
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
      from(updateUser((action as any).data)).pipe(ignoreElements())
    )
  );

const createSiteEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.CREATESITEASYNC),
    mergeMap((action) =>
      from(createSite((action as any).data)).pipe(
        map((response) => {
          console.log(response);
          return setSiteList([]);
        })
      )
    )
  );

export const epic = combineEpics(
  getSiteListEpic,
  startWorkingHoursEpic,
  updateWorkingHoursEpic,
  createUserEpic,
  getWorkingHoursListEpic,
  updateUserEpic,
  createSiteEpic
);
