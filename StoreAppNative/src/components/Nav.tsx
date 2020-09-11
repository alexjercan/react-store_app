import React, {useState} from "react";
import {
    Button,
    NativeSyntheticEvent,
    StyleSheet, Text,
    TextInput,
    TextInputSubmitEditingEventData, TouchableOpacity,
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
            <View style={styles.nav}>
                <View style={styles.kaufland}>
                    <Text style={styles.kauflandText}>
                        Kaufland Stores
                    </Text>
                </View>
                <View style={styles.settings}>
                    <TouchableOpacity onPress={menuClickedHandler}>
                        <View>
                            <Text style={styles.settingsText}>
                                Settings
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    setting ?
                        <View>
                            <TextInput
                                style={styles.option}
                                keyboardType='numeric'
                                placeholder={"100"}
                                onSubmitEditing={maxRadiusValidate}
                                onChangeText={maxRadiusTextHandler}
                                value={maxRadiusValue.toString()}
                            />
                            <Slider
                                style={styles.option}
                                minimumValue={0}
                                maximumValue={props.maxRadius}
                                onValueChange={radiusRangeHandler}
                                value={Math.min(props.radius, maxRadiusValue)}
                            />
                        </View>
                        : <></>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        height: 80,
        backgroundColor: "#040F16",
        justifyContent: "center",
        display: "flex",
    },
    kaufland: {
        alignSelf: "flex-start",
    },
    kauflandText: {
        textAlign: "center",
        color: "#B80C09",
        fontSize: 20,
        fontWeight: "bold",
    },
    settings: {
        alignSelf: "flex-end"
    },
    settingsText: {
        textAlign: "center",
        color: "#B80C09",
        fontSize: 20,
        fontWeight: "bold",
    },
    option: {
        backgroundColor: "#040F16",
        color: "#FBFBFF",
        display: "flex",
        alignContent: "center",
        padding: 15,
        margin: 0, 
    },
    input: {
        
    },
    label: {
        
    },
})

export default Nav;