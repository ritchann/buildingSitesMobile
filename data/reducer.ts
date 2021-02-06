import { ActionType } from "./actionType";
import { Action, Site } from "./model";

export interface StateType {
  siteList: Site[];
}

const InitialState: StateType = {
  siteList: [],
};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETSITELIST: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
};
