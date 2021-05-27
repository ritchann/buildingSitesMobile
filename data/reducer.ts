import { emptyUser } from "../core/objectConst";
import { ActionType } from "./actionType";
import { Action, Employee, Site, WorkingHours } from "./model";

export interface StateType {
  siteList: Site[];
  startWorkingHours?: WorkingHours;
  user: Employee;
  currentSite?: Site;
  workingHoursList: WorkingHours[];
  location: { lon: number; lat: number };
}

const InitialState: StateType = {
  siteList: [],
  workingHoursList: [],
  user: emptyUser,
  location: { lon: 0, lat: 0 },
};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETSITELIST: {
      return { ...state, siteList: action.data as Site[] };
    }
    case ActionType.SETSTARTWORKINGHOURS: {
      return { ...state, startWorkingHours: action.data as WorkingHours };
    }
    case ActionType.SETUSER: {
      return { ...state, user: action.data as Employee };
    }
    case ActionType.SETCURRENTSITE: {
      return { ...state, currentSite: action.data as Site };
    }
    case ActionType.SETWORKINGHOURSLIST: {
      return { ...state, workingHoursList: action.data as WorkingHours[] };
    }
    case ActionType.SETLOCATION: {
      return {
        ...state,
        location: action.data as { lon: number; lat: number },
      };
    }
    default:
      return state;
  }
};
