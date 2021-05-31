import axios from "axios";
import { Accident, AuthResponse, Employee, PPE, WorkingHours } from "./model";

const url = "https://building-test-123.herokuapp.com/";

//const url = "http://192.168.43.232:5000/";

export const getSiteList = (data:{
  onResponseCallback: () => void;
}) =>
  axios.get(url + "site").then((res) => res.data);

export const startWorkingHours = (data: WorkingHours) =>
  axios.post(url + "workingHours", data).then((res) => res.data);

export const updateWorkingHours = (data: WorkingHours) =>
  axios.put(url + `workingHours/${data.id}`, data).then((res) => res.data);

export const createUser = (data: Employee) =>
  axios.post(url + "employee", data).then((res) => res.data);

export const getWorkingHoursList = (data: {
  id: number;
  onResponseCallback: () => void;
}) => axios.get(url + `workingHours/${data.id}`).then((res) => res.data);

export const updateUser = (data: {
  employee: Employee;
  onResponseCallback: () => void;
}) =>
  axios
    .put(url + `employee/${data.employee.id}`, data.employee)
    .then((res) => res.data);

export const createAccident = (data: Accident) =>
  axios.post(url + "accident", data).then((res) => res.data);

export const checkPPE = (data: {
  base64: string;
  onResponseCallback: (value: PPE) => void;
}) => axios.post(url + "ml", data).then((res) => res.data);

export const auth = (data: {
  login: string;
  password: string;
  onResponseCallback: (value: AuthResponse) => void;
}) => axios.post(url + "auth", data).then((res) => res.data);

export const signOut = () => axios.get(url + "signOut").then((res) => res.data);

export const signUp = (data: {
  employee: Employee;
  onResponseCallback: (value: AuthResponse) => void;
}) => axios.post(url + "signUp", data).then((res) => res.data);

export const getAccidents = (data: {
  workingHours: WorkingHours;
  onResponseCallback: (value: Accident[]) => void;
}) =>
  axios.get(url + `accident/${data.workingHours.id}`).then((res) => res.data);

export const updateAccident = (data: Accident) =>
  axios.put(url + `accident/${data.id}`, data).then((res) => res.data);
