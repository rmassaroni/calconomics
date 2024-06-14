import './App.css';
import AddButton from './AddButton.js';
import Block from './Block.js';
import React, { useState, useRef, useEffect } from 'react';

function App() {
    const newInputRef = useRef(null);
    const newInputValueRef = useRef(null);
    const [inputs, setInputs] = useState([
        { name: 'afc', value: 0, solved: false, custom: false},
        { name: 'tfc', value: 0, solved: false, custom: false },
        { name: 'q', value: 0, solved: false, custom: false }
    ]);
    const [newVariableName, setNewVariableName] = useState('');
    const [newVariableValue, setNewVariableValue] = useState(0);
    const [addingVariable, setAddingVariable] = useState(false);
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);

        if (newInputs[index].name === 'tfc' || newInputs[index].name === 'q') {
            const tfcValue = parseFloat(newInputs.find(input => input.name === 'tfc').value);
            const qValue = parseFloat(newInputs.find(input => input.name === 'q').value);

            if (!isNaN(tfcValue) && !isNaN(qValue) && qValue !== 0 && tfcValue !== 0) {
                newInputs.find(input => input.name === 'afc').solved = true;
            } else {
                newInputs.find(input => input.name === 'afc').solved = false;
            }
            setInputs(newInputs);
        } 
    };
    const handleAddVariable = () => {
        // if (newVariableName.trim() === '') {
        //     alert('Please enter a name for the new variable.');
        //     return;
        // }
        if (addingVariable) {
            return;
        }
        setAddingVariable(true);
        // setInputs(prevInputs => {
        //     const newInputs = [
        //         ...prevInputs,
        //         // { name: newVariableName, value: 0, solved: false }
        //         { name: 'name', value: 0, solved: false }
        //
        //     ];
        //     return newInputs;
        // });
        // setTimeout(() => {
        //     if (newInputRef.current) {
        //         newInputRef.current.focus();
        //     }
        // }, 0);
    };

    const handleCustomInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            const index = inputs.findIndex(input => input.custom);
            if (index !== -1) {
                const newInputs = [...inputs];
                //newInputs[index].custom = false;
                setInputs(newInputs);
            }
            // if (newInputValueRef.current) {
            //     newInputValueRef.current.focus();
            // }
            if (addingVariable) {
                setInputs(prevInputs => {
                    const newInputs = [
                        ...prevInputs,
                        { name: newVariableName, value: 0, solved: false, custom: true}
                    ];
                    return newInputs;
                });
                setNewVariableName('');
                setAddingVariable(false);
            }
        }
    };

    const calculateMinWidth = (value) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '14px Arial';
        const textWidth = context.measureText(value).width;
        return `${textWidth}px`;
    };

    useEffect(() => {
        if (addingVariable && newInputRef.current) {
            newInputRef.current.focus();
        }
    }, [addingVariable]);

    return (
        <div className="App">
            <header className="App-header" style={{ overflow: "hidden"}}>
                {inputs.map((input, index) => (
                    !input.solved ? (
                        <div className="VarBlock" key={index}>
                            <label>
                                <div style={{ display: "block", color: input.custom ? "yellow" : "white" }}>{input.name.toUpperCase()}</div>
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
                {!addingVariable ? (
                    <div style={{ borderRadius: "50%" }}>
                        <AddButton onClick={handleAddVariable} newVariableName={newVariableName} setNewVariableName={setNewVariableName}/>
                    </div>
                ) : (
                        <div className="VarBlock" style={{ overflow: "hidden" }}>
                            <label style={{ width: "-webkit-fill-available" }}>
                                    <input
                                        ref={newInputRef}
                                        style={{ width: "-webkit-fill-available", display: "block", backgroundColor: "#282c34", border: "1px solid #ccc", borderRadius: "20px", paddingLeft: "5px", display: "block", fontSize: "calc(10px + 2vmin)", textAlign: "center", color: "white"}}
                                        placeholder="new"
                                        value={newVariableName}
                                        onChange={(e) => setNewVariableName(e.target.value)}
                                        onKeyPress={handleCustomInputKeyPress}
                                    >
                                        </input>

                                <input ref={newInputValueRef} style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }} value={0} onChange={(e) => setNewVariableValue(e.target.value)}>
                                </input>
                            </label>
                        </div>
                    )}
            </header>
            <div className="Solutions">
                {inputs.map((input, index) => (
                    input.solved ? (
                    <div className="VarBlock" style={{ borderColor: "green" }}>
                        <label>
                            <div style={{ display: "block" }}>AFC</div>
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

