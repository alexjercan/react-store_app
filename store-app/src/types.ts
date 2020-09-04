interface IStore {
  id: string;
  name: string;
  position: Coordinates;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export type Store = IStore;
export type Coordinates = ICoordinates;
