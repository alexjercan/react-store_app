import React, { useState } from "react";
import Schedule from "./Schedule";
import "./Store.css";
import "./Dropdown.css";

interface Props {
  store: TStore;
}

const Store: React.FC<Props> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  const storeClickedHandler = () => {
    setShow(!show);
  };

  return (
    <div className="store">
      <div className="menu" onClick={storeClickedHandler}>
        {props.store.name}
      </div>
      <div className={show ? "down" : "dropdown"}>
        <Schedule schedule={props.store.schedule} />
      </div>
    </div>
  );
};

export default Store;
