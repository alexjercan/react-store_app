import React, { useState, useEffect } from "react";
import StoreElement from "./Store";
import { Store, Coordinates } from "../types";
import { getStoresNearCoords } from "../utils";

interface Props {
  radius: number;
  allStores: Store[] | undefined;
  coords: Coordinates;
}

const StoreList: React.FC<Props> = (props) => {
  const [stores, setStores] = useState<Store[] | undefined>();

  useEffect(() => {
    setStores(getStoresNearCoords(props.allStores, props.coords, props.radius));
  }, [props.radius, props.allStores, props.coords]);

  return (
    <div>
      <ul>
        {stores?.map((store) => (
          <StoreElement key={store.id} name={store.name} />
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
