import React, { useState } from "react";
import {StyleSheet, Text, View} from "react-native";

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
        <Text style={styles.storeText}>
            {props.store.name}
        </Text> 
    </View>
  );
};

const styles = StyleSheet.create({
    store: {
        
    },
    storeText: {
        textAlign: "left",
        color: "#FBFBFF",
        fontSize: 20,
        padding: 15,
    },
})

export default Store;
