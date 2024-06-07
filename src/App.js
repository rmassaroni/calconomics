import './App.css';
import React, { useState } from 'react';

function App() {
    const [inputs, setInputs] = useState([
        { name: 'afc', value: 0, show: true },
        { name: 'tfc', value: 0, show: true },
        { name: 'q', value: 0, show: true }
    ]);
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);

        if (newInputs[index].name === 'tfc' || newInputs[index].name === 'q') {
            const tfcValue = parseFloat(newInputs.find(input => input.name === 'tfc').value);
            const qValue = parseFloat(newInputs.find(input => input.name === 'q').value);

            if (!isNaN(tfcValue) && !isNaN(qValue) && qValue !== 0) {
                newInputs.find(input => input.name === 'afc').show = false;
            } else {
                newInputs.find(input => input.name === 'afc').show = true;
            }
            setInputs(newInputs);
        } 
        // else if (newInputs[index].name === 'afc' && newInputs[index].show) {
        //     console.log('true')
        //     const originalAfcIndex = newInputs.findIndex(input => input.name === 'afc');
        //     newInputs[originalAfcIndex].show = false;
        //     setInputs(newInputs);
        // }
        if (inputs.find(input => input.name === 'afc').show) {
            // const originalAfcIndex = newInputs.findIndex(input => input.name === 'afc');
            // newInputs[originalAfcIndex].show = false;
            // setInputs(newInputs);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                {inputs.map((input, index) => (
                    input.show ? (
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
                    ) : null
                ))}
                </header>
            <div className="Solutions">
                {inputs.map((input, index) => (

                    !input.show ? (
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

