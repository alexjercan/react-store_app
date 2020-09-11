import React, {useEffect, useState} from 'react';
import Store from './Store';
import {View} from 'react-native';

interface Props {
  radius: number;
  allStores: IStore[] | undefined;
  coords: ICoordinates;
}

const StoreList: React.FC<Props> = (props) => {
  const [stores, setStores] = useState<IStore[]>();

  useEffect(() => {
    const getStoresNearCoords = (
      stores: IStore[] | undefined,
      coords: ICoordinates,
      radius: number,
    ) => {
      const distance = (p: ICoordinates, q: ICoordinates) => {
        const lat1 = p.latitude;
        const lon1 = p.longitude;
        const lat2 = q.latitude;
        const lon2 = q.longitude;
        const R = 6371;
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      };

      return stores
        ?.sort((a: IStore, b: IStore) => {
          return distance(a.coords, coords) - distance(b.coords, coords);
        })
        .filter((store): boolean => {
          return distance(store.coords, coords) <= radius;
        });
    };

    setStores(getStoresNearCoords(props.allStores, props.coords, props.radius));
  }, [props.radius, props.allStores, props.coords]);

  return (
    <View>
      {stores?.map((store) => (
        <Store key={store.id} store={store} />
      ))}
    </View>
  );
};

export default StoreList;
