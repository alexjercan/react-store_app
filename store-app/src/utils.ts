import { Store, Coordinates } from "./types";

export const getStores = async (position: Coordinates, radius: number) => {
  const response = await fetch("http://localhost:8080/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { position: position, radius: radius },
    }),
  });

  if (response.status !== 400) {
    const dataArray: any[] = await response.json();
    const storesArray = dataArray.map(
      (store): Store => {
        return {
          id: store.storeId,
          name: store.name,
          coords: {
            latitude: store.latitude,
            longitude: store.longitude,
          },
        };
      }
    );

    return storesArray;
  }
};

const getDistance = (p: Coordinates, q: Coordinates) => {
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

export const getStoresNearCoords = (
  stores: Store[] | undefined,
  coords: Coordinates,
  radius: number
) => {
  return stores?.filter((store): boolean => {
    const storePosition: Coordinates = {
      latitude: store.coords.latitude,
      longitude: store.coords.longitude,
    };
    const distance = getDistance(storePosition, coords);
    return distance <= radius;
  });
};
