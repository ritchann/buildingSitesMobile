import { ActionType } from "./actionType";
import { Action } from "./model";

export const getSiteListAsync: (data: any) => Action = (data) => {
  return { type: ActionType.GETSITELISTASYNC, data };
};

export const setSiteList: (data: any) => Action = (data) => {
  return { type: ActionType.SETSITELIST, data };
};

export const startWorkingHoursAsync: (data: any) => Action = (data) => {
  return { type: ActionType.STARTWORKINGHOURSASYNC, data };
};

export const setStartWorkingHours: (data: any) => Action = (data) => {
  return { type: ActionType.SETSTARTWORKINGHOURS, data };
};

export const updateWorkingHoursAsync: (data: any) => Action = (data) => {
  return { type: ActionType.UPDATEWORKINGHOURSASYNC, data };
};

export const setUser: (data: any) => Action = (data) => {
  return { type: ActionType.SETUSER, data };
};

export const createUserAsync: (data: any) => Action = (data) => {
  return { type: ActionType.CREATEUSERASYNC, data };
};

export const setCurrentSite: (data: any) => Action = (data) => {
  return { type: ActionType.SETCURRENTSITE, data };
};

export const getWorkingHoursListAsync: (data: any) => Action = (data) => {
  return { type: ActionType.GETWORKINGHOURSLISTASYNC, data };
};

export const setWorkingHoursList: (data: any) => Action = (data) => {
  return { type: ActionType.SETWORKINGHOURSLIST, data };
};

export const updateUserAsync: (data: any) => Action = (data) => {
  return { type: ActionType.UPDATEUSERASYNC, data };
};

export const createAccidentAsync: (data: any) => Action = (data) => {
  return { type: ActionType.CREATEACCIDENTASYNC, data };
};

export const checkPPEAsync: (data: any) => Action = (data) => {
  return { type: ActionType.CHECKPPEASYNC, data };
};

export const authAsync: (data: any) => Action = (data) => {
  return { type: ActionType.AUTHASYNC, data };
};

export const signOutAsync: () => Action = () => {
  return { type: ActionType.SIGNOUTASYNC };
};

export const signUpAsync: (data: any) => Action = (data) => {
  return { type: ActionType.SIGNUPASYNC, data };
};

export const setLocation: (data: any) => Action = (data) => {
  return { type: ActionType.SETLOCATION, data };
};

export const getAccidentsAsync: (data: any) => Action = (data) => {
  return { type: ActionType.GETACCIDENTSASYNC, data };
};

export const updateAccidentAsync: (data: any) => Action = (data) => {
  return { type: ActionType.UPDATEACCIDENTASYNC, data };
};
