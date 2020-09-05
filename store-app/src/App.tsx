import React, { useState, useEffect } from "react";
import "./App.css";
import ShopList from "./components/StoreList";
import Nav from "./components/Nav";

const App: React.FC = () => {
  const [maxRadius, setMaxRadius] = useState<number>(100);
  const [radius, setRadius] = useState<number>(10);
  const [allStores, setAllStores] = useState<TStore[] | undefined>();
  const [coords, setCoords] = useState<TCoordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos: TCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoords(pos);
      });
    };

    updateLocation();
  }, []);

  useEffect(() => {
    const getStoresInRange = (radius: number) => {
      const getStores = async (position: TCoordinates, radius: number) => {
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
          const storesArray = dataArray.map(
            (store): TStore => {
              const dataOpeningHoursArray: any[] = store.openingHours;
              const days: TDaySChedule[] = dataOpeningHoursArray.map(
                (day): TDaySChedule => {
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

          return storesArray;
        }
      };

      getStores(coords, maxRadius).then(setAllStores);
    };

    getStoresInRange(maxRadius);
  }, [maxRadius, coords]);

  return (
    <div className="app">
      <Nav
        setRadius={setRadius}
        radius={radius}
        maxRadius={maxRadius}
        setMaxRadius={setMaxRadius}
      />
      <ShopList radius={radius} coords={coords} allStores={allStores} />
    </div>
  );
};

export default App;
