import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [afc, setAfc] = useState(0);
    const [tfc, setTfc] = useState(0);
    const [q, setQ] = useState(0);

    const handleAfcChange = (e) => {
        setAfc(e.target.value);
    };

    const handleTfcChange = (e) => {
        setTfc(e.target.value);
    };

    const handleQChange = (e) => {
        setQ(e.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <label>
                    AFC:
                    <input type="number" value={afc} onChange={handleAfcChange} />
                </label>
                <br />
                <label>
                    TFC:
                    <input type="number" value={tfc} onChange={handleTfcChange} />
                </label>
                <br />
                <label>
                    Q:
                    <input type="number" value={q} onChange={handleQChange} />
                </label>
                <br />
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
