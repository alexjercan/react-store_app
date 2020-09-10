import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

interface Coordinates {
  latitude: number;
  longitude: number;
}

dotenv.config();

const kauflandApiURL = "https://api.kaufland.net/stores/api/v1/";

const app = express();
const port = 8080;

type StoreArray = any[];
let stores: StoreArray = [];

const getStores = async () => {
  try {
    const response = await fetch(kauflandApiURL, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": `${process.env.KAUFLAND_API_KEY}`,
      },
    });

    if (response.status !== 400) {
      return await response.json();
    }

    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getStoresNearPosition = (position: Coordinates, radius: number) => {
  return stores.filter((store): boolean => {
    const storePosition: Coordinates = {
      latitude: store.latitude,
      longitude: store.longitude,
    };
    const distance = getDistance(storePosition, position);
    return distance <= radius;
  });
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
  return R * c;
};

getStores().then((data) => {
  stores = data;
});

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  res.send(stores);
});

app.post("/", (req, res) => {
  const data = req.body.data;
  console.log(data);
  const position = {
    latitude: +data.position.latitude,
    longitude: +data.position.longitude,
  };
  const radius = data.radius;
  res.send(getStoresNearPosition(position, radius));
});

app.listen(port);
