import './App.css';
import React, { useState } from 'react';

function App() {
    const [inputs, setInputs] = useState([
        { name: 'afc', value: 0 },
        { name: 'tfc', value: 0 },
        { name: 'q', value: 0 }
    ]);
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
    };

    return (
        <div className="App">
            <header className="App-header">
                {inputs.map((input, index) => (
                    <div className="Line" key={index}>
                        <label>
                            <p2 style={{ display: "block" }}>{input.name.toUpperCase()}: </p2>
                            <input style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }}
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
