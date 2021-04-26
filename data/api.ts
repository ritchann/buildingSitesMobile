import axios from "axios";
import { Accident, Employee, WorkingHours } from "./model";

const url = "http://192.168.0.104:5000/";

export const getSiteList = () =>
  axios.get(url + "site").then((res) => res.data);

export const startWorkingHours = (data: WorkingHours) =>
  axios.post(url + "workingHours", data).then((res) => res.data);

export const updateWorkingHours = (data: WorkingHours) =>
  axios.put(url + `workingHours/${data.id}`, data).then((res) => res.data);

export const createUser = (data: Employee) =>
  axios.post(url + "employee", data).then((res) => res.data);

export const getWorkingHoursList = (data: number) =>
  axios.get(url + `workingHours/${data}`).then((res) => res.data);

export const updateUser = (data: Employee) =>
  axios.put(url + `employee/${data.id}`, data).then((res) => res.data);

export const createAccident = (data: Accident) =>
  axios.post(url + "accident", data).then((res) => res.data);



