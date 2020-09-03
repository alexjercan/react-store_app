import React from 'react';
import './App.css';
import Form from './components/Form';
import ShopList from './components/ShopList';

const App: React.FC = () => {
    return (
        <div className="App">
            <Form />
            <ShopList />
        </div>
    );
}

export default App;
