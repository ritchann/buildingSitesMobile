export interface Action {
  type: string;
  data?: any;
}

export interface Site {
  id: number;
  coords: number[][];
  name: string;
  city: string;
  street: string;
  test: string;
}

export interface WorkingHours {
  id: number;
  start: Date;
  end: Date;
  employeeId: number;
  siteId: number;
  status: number;
  steps: number;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  inipa: string;
  tin: string;
  birthDate: string;
  phoneNumber: string;
  specialty: number;
  password: string;
  login: string;
}

export interface Accident {
  id: number;
  time: Date;
  workingHoursId: number;
  lon: number;
  lat: number;
}
