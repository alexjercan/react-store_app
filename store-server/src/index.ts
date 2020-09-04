import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const kauflandApiURL = 'https://api.kaufland.net/stores/api/v1/';

const app = express();
const port = 8080;

let stores = [{}];

const getStores = async() => {
    try {
        const response = await fetch(kauflandApiURL, {
            method: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': `${process.env.KAUFLAND_API_KEY}`}
        });

        if (response.status !== 400) {
            const body = await response.json();
            return body;
        }

        return undefined;
    }
    catch(err) {
        console.log(err);
    }
}

getStores().then((data) => {
    stores = data;
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.get( "/", ( req, res ) => {
    console.log(stores);
    res.send(stores);
} );

app.listen(port);