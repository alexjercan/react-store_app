interface IStore {
  id: string;
  name: string;
  coords: TCoordinates;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

type TStore = IStore;
type TCoordinates = ICoordinates;
