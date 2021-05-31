import { Employee } from "../data/model";

export const emptyUser: Employee = {
  // name: "Иван",
  // surname: "Иванов",
  // patronymic: "Иванович",
  // inipa: "123-456-789 00",
  // tin: "3664069397",
  // birthDate: "10-05-1990",
  // phoneNumber: "+7(930)686-62-17",
  // specialty: 0,
  // email: "hshhs@mail.ru",
  // password: "12345678",
  // repeatedPassword: "12345678",
  name: "",
  surname: "",
  patronymic: "",
  inipa: "",
  tin: "",
  birthDate: "",
  phoneNumber: "",
  specialty: 0,
  email: "",
  password: "",
  repeatedPassword: "",
};

export const regexpTin: RegExp = /^([0-9]{10}|[0-9]{12})$/;

export const regexpInipa: RegExp = /^(?:[- ]*\d){11}$/;

export const regexpPhone: RegExp = /^(\+7|8)(?:[-()]*\d){10}$/;

export const regexpEmail: RegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const regexpPassword: RegExp = /^(?=.*\d).{8,}$/;
