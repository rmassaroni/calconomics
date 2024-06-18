import './App.css';
import AddButton from './AddButton';
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface Input {
    name: string;
    value: number;
    solved: boolean;
    custom: boolean;
}

const App: React.FC = () => {
    const newInputRef = useRef<HTMLInputElement>(null);
    const newInputValueRef = useRef<HTMLInputElement>(null);
    const [inputs, setInputs] = useState<Input[]>([
        { name: 'afc', value: 0, solved: false, custom: false },
        { name: 'tfc', value: 0, solved: false, custom: false },
        { name: 'q', value: 0, solved: false, custom: false }
    ]);
    const [newVariableName, setNewVariableName] = useState<string>('');
    const [newVariableValue, setNewVariableValue] = useState<number>(0);
    const [addingVariable, setAddingVariable] = useState<boolean>(false);

    const handleInputChange = (index: number, value: number) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);

        if (newInputs[index].name === 'tfc' || newInputs[index].name === 'q') {
            const tfcValue = parseFloat(newInputs.find(input => input.name === 'tfc')?.value.toString() || '0');
            const qValue = parseFloat(newInputs.find(input => input.name === 'q')?.value.toString() || '0');

            if (!isNaN(tfcValue) && !isNaN(qValue) && qValue !== 0 && tfcValue !== 0) {
                const afcInput = newInputs.find(input => input.name === 'afc');
                if (afcInput) {
                    afcInput.solved = true;
                }
            } else {
                const afcInput = newInputs.find(input => input.name === 'afc');
                if (afcInput) {
                    afcInput.solved = false;
                }
            }
            setInputs(newInputs);
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
            const index = inputs.findIndex(input => input.custom);
            if (index !== -1) {
                const newInputs = [...inputs];
                setInputs(newInputs);
            }
            if (addingVariable) {
                setInputs(prevInputs => {
                    const newInputs = [
                        ...prevInputs,
                        { name: newVariableName, value: 0, solved: false, custom: true }
                    ];
                    return newInputs;
                });
                setNewVariableName('');
                setAddingVariable(false);
            }
        }
    };

    const calculateMinWidth = (value: string): string => {
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
            <header className="App-header" style={{ overflow: "hidden" }}>
                {inputs.map((input, index) => (
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
                                ref={newInputRef}
                                style={{ width: "-webkit-fill-available", display: "block", backgroundColor: "#282c34", border: "1px solid #ccc", borderRadius: "20px", paddingLeft: "5px", display: "block", fontSize: "calc(10px + 2vmin)", textAlign: "center", color: "white" }}
                                placeholder="new"
                                value={newVariableName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewVariableName(e.target.value)}
                                onKeyPress={handleCustomInputKeyPress}
                            />
                            <input
                                ref={newInputValueRef}
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
                {inputs.map((input, index) => (
                    input.solved ? (
                        <div className="VarBlock" key={index} style={{ borderColor: "green" }}>
                            <label>
                                <div style={{ display: "block" }}>AFC</div>
                                <input
                                    style={{ border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px" }}
                    

