import './App.css';
import AddButton from './AddButton';
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Variable } from './types';

const App: React.FC = () => {
    const newVarRef = useRef<HTMLInputElement>(null);
    const newVarValueRef = useRef<HTMLInputElement>(null);
    const [vars, setVars] = useState<Variable[]>([
        { name: 'afc', value: 0, solved: false, custom: false },
        { name: 'tfc', value: 0, solved: false, custom: false },
        { name: 'q', value: 0, solved: false, custom: false }
    ]);
    const [newVariableName, setNewVariableName] = useState<string>('');
    const [newVariableValue, setNewVariableValue] = useState<number>(0);
    const [addingVariable, setAddingVariable] = useState<boolean>(false);

    const handleInputChange = (index: number, value: number) => {
        const newVars = [...vars];
        newVars[index].value = value;
        setVars(newVars);

        if (newVars[index].name === 'tfc' || newVars[index].name === 'q') {
            const tfcValue = parseFloat(newVars.find(input => input.name === 'tfc')?.value.toString() || '0');
            const qValue = parseFloat(newVars.find(input => input.name === 'q')?.value.toString() || '0');

            if (!isNaN(tfcValue) && !isNaN(qValue) && qValue !== 0 && tfcValue !== 0) {
                const afcInput = newVars.find(input => input.name === 'afc');
                if (afcInput) {
                    afcInput.solved = true;
                }
            } else {
                const afcInput = newVars.find(input => input.name === 'afc');
                if (afcInput) {
                    afcInput.solved = false;
                }
            }
            setVars(newVars);
        }
    };

    const handleAddVariable = () => {
        if (addingVariable) {
            return;
        }
        setAddingVariable(true);
    };

    const handleCustomInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const index = vars.findIndex(input => input.custom);
            if (index !== -1) {
                const newVars = [...vars];
                setVars(newVars);
            }
            if (addingVariable) {
                setVars(prevInputs => {
                    const newVars = [
                        ...prevInputs,
                        { name: newVariableName, value: 0, solved: false, custom: true }
                    ];
                    return newVars;
                });
                setNewVariableName('');
                setAddingVariable(false);
            }
        }
    };

    useEffect(() => {
        if (addingVariable && newVarRef.current) {
            newVarRef.current.focus();
        }
    }, [addingVariable]);

    return (
        <div className="App">
            <header className="App-header" style={{ overflow: "hidden" }}>
                {vars.map((input, index) => (
                    !input.solved ? (
                        <div className="VarBlock" key={index}>
                            <label>
                                <div style={{ display: "block", color: input.custom ? "yellow" : "white" }}>{input.name.toUpperCase()}</div>
                                <input
                                    style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px", minWidth: "100px" }}
                                    type="number"
                                    value={input.value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, parseFloat(e.target.value))}
                                />
                            </label>
                            <br />
                        </div>
                    ) : null
                ))}
                {!addingVariable ? (
                    <div style={{ borderRadius: "50%" }}>
                        <AddButton onClick={handleAddVariable} newVariableName={newVariableName} setNewVariableName={setNewVariableName} />
                    </div>
                ) : (
                    <div className="VarBlock" style={{ overflow: "hidden" }}>
                        <label style={{ width: "-webkit-fill-available" }}>
                            <input
                                ref={newVarRef}
                                style={{ width: "-webkit-fill-available", display: "block", backgroundColor: "#282c34", border: "1px solid #ccc", borderRadius: "20px", paddingLeft: "5px", fontSize: "calc(10px + 2vmin)", textAlign: "center", color: "white" }}
                                placeholder="new"
                                value={newVariableName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewVariableName(e.target.value)}
                                onKeyPress={handleCustomInputKeyPress}
                            />
                            <input
                                ref={newVarValueRef}
                                style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }}
                                type="number"
                                value={newVariableValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewVariableValue(parseFloat(e.target.value))}
                            />
                        </label>
                    </div>
                )}
            </header>
            <div className="Solutions">
                {vars.map((input, index) => (
                    input.solved ? (
                        <div className="VarBlock" key={index} style={{ borderColor: "green" }}>
                            <label>
                                <div style={{ display: "block" }}>AFC</div>
                                <input
                                    style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }}
                                    type="number"
                                    value={(parseFloat(vars.find(input => input.name === 'tfc')?.value.toString() || '0') / parseFloat(vars.find(input => input.name === 'q')?.value.toString() || '0')).toFixed(2)}
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

export default App;
