interface IStore {
  id: string;
  name: string;
  coords: ICoordinates;
  schedule: ISchedule;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface ISchedule {
  days: IDaySchedule[];
}

interface IDaySchedule {
  weekday: string;
  open: number;
  close: number;
}
