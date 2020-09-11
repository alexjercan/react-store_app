import React, {useState} from "react";
import {NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View} from "react-native";

interface Props {
    radius: number;
    setRadius: React.Dispatch<React.SetStateAction<number>>;
    maxRadius: number;
    setMaxRadius: React.Dispatch<React.SetStateAction<number>>;
}

const Nav: React.FC<Props> = (props) => {
    const [maxRadiusValue, setMaxRadiusValue] = useState<number>(100);
    const [setting, setSetting] = useState<boolean>(false);

    const maxRadiusTextHandler = (text: string) => {
        setMaxRadiusValue(+text);
    };

    const maxRadiusValidate = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        console.log(event);
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
                onKeyPress={maxRadiusValidate}
                onChangeText={maxRadiusTextHandler}
                value={maxRadiusValue.toString()}
            />
        </View>
    );
}

export default Nav;