import React, { useState } from "react";
import "./Form.css";

interface Props {
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  maxRadius: number;
  setMaxRadius: React.Dispatch<React.SetStateAction<number>>;
}

const Form: React.FC<Props> = (props) => {
  const [maxRadiusValue, setMaxRadiusValue] = useState<number>(0);
  const [radiusValue, setRadiusValue] = useState<number>(0);

  const radiusRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRadius(+event.target.value);
    setRadiusValue(+event.target.value);
  };

  const radiusTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadiusValue(+event.target.value);
  };

  const radiusValidate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setRadiusValue(Math.min(radiusValue, maxRadiusValue));
      props.setRadius(radiusValue);
    }
  };

  const maxRadiusTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxRadiusValue(+event.target.value);
  };

  const maxRadiusValidate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.setMaxRadius(maxRadiusValue);
      props.setRadius(Math.min(props.radius, maxRadiusValue));
      setRadiusValue(Math.min(props.radius, maxRadiusValue));
    }
  };

  return (
    <div>
      <ul>
        <li className="option">
          <div className="label">Range</div>
          <input
            type="range"
            min="0"
            max={props.maxRadius}
            onChange={radiusRangeHandler}
            value={props.radius}
          />
        </li>
        <li className="option">
          <div className="label">Range</div>
          <input
            className="input"
            type="text"
            pattern="[0-9]*"
            onKeyDown={radiusValidate}
            onChange={radiusTextHandler}
            value={radiusValue}
          />
        </li>
        <li className="option">
          <div className="label">Max Range</div>
          <input
            className="input"
            type="text"
            pattern="[0-9]*"
            onKeyDown={maxRadiusValidate}
            onChange={maxRadiusTextHandler}
            value={maxRadiusValue}
          />{" "}
        </li>
      </ul>
    </div>
  );
};

export default Form;
