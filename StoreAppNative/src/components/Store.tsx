import React, { useState } from "react";
import {Text, View} from "react-native";

interface Props {
  store: IStore;
}

const Store: React.FC<Props> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  const storeClickedHandler = () => {
    setShow(!show);
  };

  return (
    <View>
        <Text>
            {props.store.name}
        </Text> 
    </View>
  );
};

export default Store;
