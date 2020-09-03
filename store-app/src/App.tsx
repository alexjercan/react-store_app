import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import ShopList from './components/ShopList';

const App: React.FC = () => {

    useEffect(() => {
        const getStores = async () => {
            const response = await fetch('http://localhost:8080/', {
                method: 'GET'
            });
        }
    });

    return (
        <div className="App">
            <Form />
            <ShopList />
        </div>
    );
}

export default App;
