import React, {useState} from "react";
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputKeyPressEventData,
    TextInputSubmitEditingEventData,
    View
} from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
    radius: number;
    setRadius: React.Dispatch<React.SetStateAction<number>>;
    maxRadius: number;
    setMaxRadius: React.Dispatch<React.SetStateAction<number>>;
}

const Nav: React.FC<Props> = (props) => {
    const [maxRadiusValue, setMaxRadiusValue] = useState<number>(100);
    const [setting, setSetting] = useState<boolean>(false);

    const radiusRangeHandler = (value: number) => {
        props.setRadius(value);
    };
    
    const maxRadiusTextHandler = (text: string) => {
        setMaxRadiusValue(+text);
    };

    const maxRadiusValidate = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        props.setMaxRadius(maxRadiusValue);
        props.setRadius(Math.min(props.radius, maxRadiusValue));
    };

    const menuClickedHandler = () => {
        setSetting(!setting);
    };
    
    return(
        <View>
            <TextInput
                keyboardType='numeric'
                placeholder={"100"}
                onSubmitEditing={maxRadiusValidate}
                onChangeText={maxRadiusTextHandler}
                value={maxRadiusValue.toString()}
            />
            <Slider 
                minimumValue={0}
                maximumValue={props.maxRadius}
                onValueChange={radiusRangeHandler}
                value={Math.min(props.radius, maxRadiusValue)}
            />
        </View>
    );
}

export default Nav;