import React, { useState, useEffect } from "react";
import "./App.css";
import ShopList from "./components/StoreList";
import Form from "./components/Form";
import { Store, Coordinates } from "./types";
import { getStores } from "./utils";

const App: React.FC = () => {
  const maxRadius = 100;
  const [radius, setRadius] = useState<number>(0);
  const [stores, setStores] = useState<Store[] | undefined>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos: Coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      getStores(pos, maxRadius).then(setStores);
    });
  }, [maxRadius]);

  return (
    <div className="App">
      <Form setRadius={setRadius} radius={radius} />
      <ShopList radius={radius} stores={stores} />
    </div>
  );
};

export default App;
