const AddButton = ({ onClick, newVariableName, setNewVariableName }) => {
    return <label>
        <button 
            style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#00d800",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
            }}

            onClick={onClick}
        >
            <div style={{ color: "white", fontSize: "24px" }}>+</div>
        </button>
    </label>
}
export default AddButton;


{/*        <input
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
                minWidth: "100px",
            }} 
            onClick={onClick}
        >
            Add
        </button>
        */}
