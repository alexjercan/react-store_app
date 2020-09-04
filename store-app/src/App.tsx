import React, { useState, useEffect } from "react";
import "./App.css";
import ShopList from "./components/StoreList";
import Form from "./components/Form";
import { Store, Coordinates } from "./types";
import { getStores } from "./utils";

const App: React.FC = () => {
  const maxRadius = 100;
  const [radius, setRadius] = useState<number>(0);
  const [allStores, setAllStores] = useState<Store[] | undefined>();
  const [coords, setCoords] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos: Coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setCoords(pos);
      getStores(pos, maxRadius).then(setAllStores);
    });
  }, [maxRadius]);

  return (
    <div className="App">
      <Form setRadius={setRadius} radius={radius} />
      <ShopList radius={radius} coords={coords} allStores={allStores} />
    </div>
  );
};

export default App;
