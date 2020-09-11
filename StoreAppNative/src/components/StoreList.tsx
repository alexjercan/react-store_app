import React from "react";
import {Text} from "react-native";

interface Props {
    radius: number;
    allStores: IStore[] | undefined;
    coords: ICoordinates;
}

const StoreList: React.FC<Props> = (props) => {
    return(
      <Text>
          STORE LIST
      </Text>  
    );
}

export default StoreList;