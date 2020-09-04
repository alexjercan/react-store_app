import React from "react";
import "./Store.css";

interface Props {
  store: TStore;
}

const Store: React.FC<Props> = (props) => {
  return <li className="store">{props.store.name}</li>;
};

export default Store;
