interface IStore {
  id: string;
  name: string;
  coords: Coordinates;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export type Store = IStore;
export type Coordinates = ICoordinates;
