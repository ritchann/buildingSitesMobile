import { emptyUser } from "../core/emptyUser";
import { ActionType } from "./actionType";
import { Action, Employee, Site, WorkingHours } from "./model";

export interface StateType {
  siteList: Site[];
  startWorkingHours?: WorkingHours;
  user: Employee;
  currentSite?: Site;
  workingHoursList: WorkingHours[];
}

const InitialState: StateType = {
  siteList: [],
  workingHoursList: [],
  user: emptyUser,
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

    default:
      return state;
  }
};
