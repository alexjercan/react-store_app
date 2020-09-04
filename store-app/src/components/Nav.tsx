import React, { useState } from "react";
import "./Nav.css";
import "./Dropdown.css";

interface Props {
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  maxRadius: number;
  setMaxRadius: React.Dispatch<React.SetStateAction<number>>;
}

const Nav: React.FC<Props> = (props) => {
  const [maxRadiusValue, setMaxRadiusValue] = useState<number>(100);
  const [setting, setSetting] = useState<boolean>(false);

  const radiusRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRadius(+event.target.value);
  };

  const maxRadiusTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxRadiusValue(+event.target.value);
  };

  const maxRadiusValidate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.setMaxRadius(maxRadiusValue);
      props.setRadius(Math.min(props.radius, maxRadiusValue));
    }
  };

  const menuClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setSetting(!setting);
  };

  return (
    <div className="nav">
      <h1 className="kaufland">Kaufland Stores</h1>
      <div className="menu settings">
        <div className="title" onClick={menuClickedHandler}>
          Settings
        </div>
        <div className={setting ? "dropdown" : "dropdown.down"}>
          <p className="option">
            <div className="label">Range</div>
            <input
              type="range"
              min="0"
              max={props.maxRadius}
              onChange={radiusRangeHandler}
              value={Math.min(props.radius, maxRadiusValue)}
            />
            <div className="label">{props.radius}</div>
          </p>
          <p className="option">
            <div className="label">Max Range</div>
            <input
              className="input"
              type="text"
              pattern="[0-9]*"
              onKeyDown={maxRadiusValidate}
              onChange={maxRadiusTextHandler}
              value={maxRadiusValue}
            />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
