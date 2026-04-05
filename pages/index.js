export default function Home() {
  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f5f7fa",
      minHeight: "100vh",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "auto",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center" }}>Accounting Hub</h1>
        <h3 style={{ textAlign: "center", color: "#555" }}>
          by Kareem Abdelmajeed
        </h3>

        <hr style={{ margin: "25px 0" }} />

        <h2>📊 Income Statement</h2>
        <input placeholder="Revenue" style={inputStyle} />
        <input placeholder="Expenses" style={inputStyle} />
        <button style={btn}>Calculate Net Income</button>

        <h2>📘 Balance Sheet</h2>
        <input placeholder="Assets" style={inputStyle} />
        <input placeholder="Liabilities" style={inputStyle} />
        <button style={btn}>Check Equation</button>

        <h2>💸 Cash Flow</h2>
        <input placeholder="Operating" style={inputStyle} />
        <input placeholder="Investing" style={inputStyle} />
        <input placeholder="Financing" style={inputStyle} />
        <button style={btn}>Calculate Cash Flow</button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "10px 15px",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px"
};
