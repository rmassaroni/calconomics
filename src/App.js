import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
    const newInputRef = useRef(null);
    const [inputs, setInputs] = useState([
        { name: 'afc', value: 0, solved: false, custom: false},
        { name: 'tfc', value: 0, solved: false, custom: false },
        { name: 'q', value: 0, solved: false, custom: false }
    ]);
    const [newVariableName, setNewVariableName] = useState('');
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);

        if (newInputs[index].name === 'tfc' || newInputs[index].name === 'q') {
            const tfcValue = parseFloat(newInputs.find(input => input.name === 'tfc').value);
            const qValue = parseFloat(newInputs.find(input => input.name === 'q').value);

            if (!isNaN(tfcValue) && !isNaN(qValue) && qValue !== 0) {
                newInputs.find(input => input.name === 'afc').solved = true;
            } else {
                newInputs.find(input => input.name === 'afc').solved = false;
            }
            setInputs(newInputs);
        } 
    };
    const handleAddVariable = () => {
        if (newVariableName.trim() === '') {
            alert('Please enter a name for the new variable.');
            return;
        }
        setInputs(prevInputs => {
            const newInputs = [
                ...prevInputs,
                { name: newVariableName, value: 0, solved: false }
            ];
            return newInputs;
        });
        setTimeout(() => {
            if (newInputRef.current) {
                newInputRef.current.focus();
            }
        }, 0);
    };

    const calculateMinWidth = (value) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '14px Arial';
        const textWidth = context.measureText(value).width;
        return `${textWidth}px`;
    };

    useEffect(() => {
        if (newInputRef.current) {
            newInputRef.current.focus();
        }
    }, [inputs]);

    return (
        <div className="App">
            <header className="App-header">
                {inputs.map((input, index) => (
                    !input.solved ? (
                        <div className="VarBlock" key={index}>
                            <label>
                                <p2 style={{ display: "block" }}>{input.name.toUpperCase()}</p2>
                                <input style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px", minWidth: "100px" }}
                                    type="number"
                                    value={input.value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            </label>
                            <br />
                        </div>
                    ) : null
                ))}
                <div className="VarBlock" style={{ height: "100%" }}>
                    <label>
                                                <input
                            type="text"
                            value={newVariableName}
                            onChange={(e) => setNewVariableName(e.target.value)}
                            placeholder="Enter variable name"
                            style={{ display: "inline-block", border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px", minWidth: "100px" }}
                        />
                        <button style={{ display: "inline-block", border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px", width: "100%", minWidth: "100px", height: "100%" }} onClick={handleAddVariable}>Add</button>
                    </label>
                </div>
            </header>
            <div className="Solutions">
                {inputs.map((input, index) => (

                    input.solved ? (
                    <div className="Line">
                        <label>
                            <p2 style={{ display: "block" }}>AFC</p2>
                            <input
                                style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }}
                                type="number"
                                value={(parseFloat(inputs.find(input => input.name === 'tfc').value) / parseFloat(inputs.find(input => input.name === 'q').value)).toFixed(2)}
                                readOnly
                            />
                        </label>
                        <br />
                    </div>
                    ) : null
                ))}
                </div>


        </div>
    );
}


//{inputs.find(input => input.name === 'afc').show && (
export default App;

