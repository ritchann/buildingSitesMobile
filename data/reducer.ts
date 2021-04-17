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
  user: {
    id: 1,
    name: "Иван",
    surname: "Иванов",
    patronymic: "Иванович",
    inipa: "123-456-789 00",
    tin: "3664069397",
    birthDate: "10-05-1990",
    phoneNumber: "+7(930)686-62-14",
    specialty: 1,
    password: "123456",
    login: "bestWorker",
  },
  workingHoursList: [],
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
