import React, {useEffect, useState} from "react";
import "./App.css";
import StoreList from "./components/StoreList";
import Nav from "./components/Nav";

const App: React.FC = () => {
  const [maxRadius, setMaxRadius] = useState<number>(100);
  const [radius, setRadius] = useState<number>(10);
  const [allStores, setAllStores] = useState<IStore[] | undefined>();
  const [coords, setCoords] = useState<ICoordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getStoresAtLocation = (radius: number) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const getStoresInRange = (radius: number, coords: ICoordinates) => {
          const getStores = async (position: ICoordinates, radius: number) => {
            const response = await fetch("http://localhost:8080/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: { position: position, radius: radius },
              }),
            });

            if (response.status !== 400) {
              const dataArray: any[] = await response.json();
                return dataArray.map(
                  (store): IStore => {
                      const dataOpeningHoursArray: any[] = store.openingHours;
                      const days: IDaySchedule[] = dataOpeningHoursArray.map(
                          (day): IDaySchedule => {
                              return {
                                  weekday: day.weekday,
                                  open: day.open,
                                  close: day.close,
                              };
                          }
                      );

                      return {
                          id: store.storeId,
                          name: store.name,
                          coords: {
                              latitude: store.latitude,
                              longitude: store.longitude,
                          },
                          schedule: {
                              days: days,
                          },
                      };
                  }
              );
            }
          };

          getStores(coords, radius).then(setAllStores);
        };

        const pos: ICoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoords(pos);
        getStoresInRange(radius, pos);
      });
    };

    getStoresAtLocation(maxRadius);
  }, [maxRadius]);

  return (
    <div className="app">
      <Nav
        setRadius={setRadius}
        radius={radius}
        maxRadius={maxRadius}
        setMaxRadius={setMaxRadius}
      />
      <StoreList radius={radius} coords={coords} allStores={allStores} />
    </div>
  );
};

export default App;
