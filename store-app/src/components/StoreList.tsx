import React, { useEffect, useState } from "react";
import Store from "./Store";

interface Store {
  id: string;
  name: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[] | null>();
  const [position, setPosition] = useState<Coordinates | null>();

  useEffect(() => {
    const getStores = async () => {
      const response = await fetch("http://localhost:8080/", {
        method: "GET",
      });

      if (response.status !== 400) {
        const dataArray: any[] = await response.json();
        const storesArray = dataArray.map(
          (store): Store => {
            return { id: store.storeId, name: store.name };
          }
        );
        setStores(storesArray);
      }
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    getStores();
  }, []);

  console.log(position);

  return (
    <div>
      <ul>
        {stores?.map((store) => (
          <Store key={store.id} name={store.name} />
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
