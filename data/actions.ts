import { ActionType } from "./actionType";
import { Action } from "./model";

export const getSiteListAsync: () => Action = () => {
  return { type: ActionType.GETSITELISTASYNC };
};

export const setSiteList: (data: any) => Action = (data) => {
  return { type: ActionType.SETSITELIST, data };
};
