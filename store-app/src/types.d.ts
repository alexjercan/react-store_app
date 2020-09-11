interface IStore {
  id: string;
  name: string;
  coords: TCoordinates;
  schedule: TSchedule;
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

type TStore = IStore;
type TCoordinates = ICoordinates;
type TDaySchedule = IDaySchedule;
type TSchedule = ISchedule;
