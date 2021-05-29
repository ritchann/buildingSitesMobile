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
  site?: Site;
  time: number;
}

export interface Employee {
  id?: number;
  name: string;
  surname: string;
  patronymic: string;
  inipa: string;
  tin: string;
  birthDate: string;
  phoneNumber: string;
  specialty: number;
  email: string;
  password?: string;
  repeatedPassword?: string;
}

export interface Accident {
  id: number;
  time: Date;
  workingHoursId: number;
  lon: number;
  lat: number;
}

export interface PPE {
  ProtectiveEquipmentModelVersion: string;
  Summary: PPESummary;
  Persons: PPEPerson[];
}

export interface PPESummary {
  PersonsIndeterminate: number[];
  PersonsWithoutRequiredEquipment: number[];
  PersonsWithRequiredEquipment: number[];
}

export interface PPEPerson {
  Confidence: number;
  Id: number;
  BodyParts: PPEBodyParts[];
}

export interface PPEBodyParts {
  EquipmentDetections: PPEEquipmentDetections[];
  Confidence: number;
  Name: string;
}

export interface PPEEquipmentDetections {
  Type: string;
  Confidence: number;
  CoversBodyPart: PPECoversBodyPart;
}

export interface PPECoversBodyPart {
  Confidence: number;
  Value: boolean;
}

export interface AuthResponse {
  employee: Employee;
  error: string;
}
