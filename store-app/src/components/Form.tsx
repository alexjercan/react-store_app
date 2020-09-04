import React from "react";

interface Props {
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const Form: React.FC<Props> = (props) => {
  const inputTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRadius(+event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        pattern="[0-9]*"
        onChange={inputTextHandler}
        value={props.radius}
      />
      {props.radius}
    </div>
  );
};

export default Form;
