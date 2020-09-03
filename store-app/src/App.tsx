import React, { useContext, useEffect, useState, useReducer } from 'react';
import './App.css';
import ShopList from './components/ShopList';


const App: React.FC = () => {

    const [stores, setStores] = useState([]);

    useEffect(() => {
        const getStores = async () => {
            const response = await fetch('http://localhost:8080/', {
                method: 'GET'
            });

            if (response.status !== 400) {
                const storesArray = await response.json();
                setStores(storesArray);
                console.log(stores);
            }
        }

        getStores();
    }, []);

    return (
        <div className="App">
            <ShopList stores={stores}/>
        </div>
    );
}

export default App;
