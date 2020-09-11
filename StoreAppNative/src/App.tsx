import React, {useEffect, useState} from 'react';
import {
    PermissionsAndroid,
    PermissionStatus,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet, Text,
    View,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';

import Nav from './components/Nav';
import StoreList from "./components/StoreList";

import geolocation, {GeolocationError} from '@react-native-community/geolocation';

const getLocation = (success: (coordinates: ICoordinates) => void, fail?: (error: GeolocationError) => void)  => {
    geolocation.getCurrentPosition(
      position =>
          success({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          }),
      error => (fail ?? console.warn)(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
        }
    );
}

const fetchStores = (coordinates: ICoordinates, radius: number, success: (stores: any[]) => void, fail?: (response: Response) => void) => {
    fetch("http://192.168.0.206:8080/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: {position: coordinates, radius: radius},
        }),
    }).then(response => {
        if (response.status !== 400) response.json().then(success); 
        else (fail ?? console.warn)(response);
    });
}

const requestLocationPermission = (callback: (result: PermissionStatus) => void) => {
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Store App Location Permissions",
            message:
                "Store App needs to access your location" +
                "so you can see nearby stores.",
            buttonPositive: "OK"
        }
    ).then(callback);
};

const toDaySchedule = (day: any): IDaySchedule => ({
    weekday: day.weekday,
    open: day.open,
    close: day.close,
})

const toStore = (store: any): IStore => ({
    id: store.storeId,
    name: store.name,
    coords: {
        latitude: store.latitude,
        longitude: store.longitude,
    },
    schedule: {
        days: store.openingHours.map(toDaySchedule),
    },
})

const App = () => {
    const [maxRadius, setMaxRadius] = useState<number>(100);
    const [radius, setRadius] = useState<number>(10);
    const [allStores, setAllStores] = useState<IStore[] | undefined>();
    const [coords, setCoords] = useState<ICoordinates>({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        requestLocationPermission(
            (status) => {
                if (status === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation(
                        coordinates => {
                            setCoords(coordinates);
                            fetchStores(coordinates, maxRadius, stores => setAllStores(stores.map(toStore)));
                        });
                }
            });
    }, [maxRadius]);
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <Text>{allStores?.length}</Text>
            <Nav
                setRadius={setRadius}
                radius={radius}
                maxRadius={maxRadius}
                setMaxRadius={setMaxRadius}
            />
            <StoreList radius={radius} coords={coords} allStores={allStores} />
          </View> 
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
