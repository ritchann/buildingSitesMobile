export interface Action {
  type: string;
  data?: any;
}

export interface BuildingSite {
  id: number;
  address: string;
  lat: number;
  lon: number;
  title: string;
  image: any;
}

export interface Site {
  id: number;
  coords: number[][];
  name: string;
}
