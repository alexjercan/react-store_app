import React from "react";
import StoreElement from "./Store";
import { Store } from "../types";

interface Props {
  radius: number;
  stores: Store[] | undefined;
}

const StoreList: React.FC<Props> = (props) => {
  return (
    <div>
      <ul>
        {props.stores?.map((store) => (
          <StoreElement key={store.id} name={store.name} />
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
