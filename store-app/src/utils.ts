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
          position: {
            latitude: store.latitude,
            longitude: store.longitude,
          },
        };
      }
    );

    return storesArray;
  }
};
