import React from "react";

interface Props {
  name: string;
}

const Store: React.FC<Props> = (props) => {
  return <li>{props.name}</li>;
};

export default Store;
