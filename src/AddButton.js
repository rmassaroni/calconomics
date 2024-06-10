const AddButton = ({ onClick, newVariableName, setNewVariableName }) => {
    return <label>
        <input
            type="text"
            value={newVariableName}
            onChange={(e) => setNewVariableName(e.target.value)}
            placeholder="Enter variable name"
            style={{ display: "block", border: "1px solid #ccc", borderRadius: "20px", padding: "5px", marginBottom: "10px", minWidth: "100px" }}
        />
        <button
            style={{
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "5px",
                marginBottom: "10px",
                width: "100%",
                minWidth: "100px",
                height: "100%"
            }} 
            onClick={onClick}
        >
            Add
        </button>
    </label>
}
export default AddButton;
