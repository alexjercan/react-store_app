import React, { useState } from "react";
import "./Store.css";
import "./Dropdown.css";

interface Props {
  store: TStore;
}

const Store: React.FC<Props> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  const storeClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setShow(!show);
  };

  return (
    <li className="store">
      <div className="menu" onClick={storeClickedHandler}>
        {props.store.name}
      </div>
      <ul className={show ? "dropdown.down" : "dropdown"}>
        <li>{props.store.coords.latitude}</li>
        <li>{props.store.coords.longitude}</li>
      </ul>
    </li>
  );
};

export default Store;
