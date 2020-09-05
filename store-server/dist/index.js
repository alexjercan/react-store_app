"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.default.config();
const kauflandApiURL = "https://api.kaufland.net/stores/api/v1/";
const app = express_1.default();
const port = 8080;
let stores = [];
const getStores = async () => {
    try {
        const response = await node_fetch_1.default(kauflandApiURL, {
            method: "GET",
            headers: {
                "Ocp-Apim-Subscription-Key": `${process.env.KAUFLAND_API_KEY}`,
            },
        });
        if (response.status !== 400) {
            const body = await response.json();
            return body;
        }
        return undefined;
    }
    catch (err) {
        console.log(err);
    }
};
const getStoresNearPosition = (position, radius) => {
    return stores.filter((store) => {
        const storePosition = {
            latitude: store.latitude,
            longitude: store.longitude,
        };
        const distance = getDistance(storePosition, position);
        return distance <= radius;
    });
};
const getDistance = (p, q) => {
    const lat1 = p.latitude;
    const lon1 = p.longitude;
    const lat2 = q.latitude;
    const lon2 = q.longitude;
    const R = 6371;
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};
getStores().then((data) => {
    stores = data;
});
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type");
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
//# sourceMappingURL=index.js.map