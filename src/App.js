import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    // const [afc, setAfc] = useState(0);
    // const [tfc, setTfc] = useState(0);
    // const [q, setQ] = useState(0);
    const [inputs, setInputs] = useState([
        { name: 'afc', value: 0 },
        { name: 'tfc', value: 0 },
        { name: 'q', value: 0 }
    ]);

    // const handleAfcChange = (e) => {
    //     setAfc(e.target.value);
    // };
    //
    // const handleTfcChange = (e) => {
    //     setTfc(e.target.value);
    // };
    //
    // const handleQChange = (e) => {
    //     setQ(e.target.value);
    // };
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {inputs.map((input, index) => (
                    <div key={index}>
                        <label>
                            {input.name.toUpperCase()}:
                            <input
                                type="number"
                                value={input.value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </label>
                        <br />
                    </div>
                ))}
            </header>
        </div>
    );
}

export default App;
