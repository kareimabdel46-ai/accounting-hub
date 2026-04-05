import { useState } from "react";

export default function Home() {

  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [netIncome, setNetIncome] = useState("");

  const [assets, setAssets] = useState("");
  const [liabilities, setLiabilities] = useState("");
  const [equityResult, setEquityResult] = useState("");

  const [operating, setOperating] = useState("");
  const [investing, setInvesting] = useState("");
  const [financing, setFinancing] = useState("");
  const [cashFlow, setCashFlow] = useState("");

  const calculateIncome = () => {
    setNetIncome(Number(revenue) - Number(expenses));
  };

  const checkBalance = () => {
    const equity = Number(assets) - Number(liabilities);
    setEquityResult(equity);
  };

  const calculateCashFlow = () => {
    const total =
      Number(operating) +
      Number(investing) +
      Number(financing);
    setCashFlow(total);
  };

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

        <hr />

        {/* Income */}
        <h2>📊 Income Statement</h2>
        <input placeholder="Revenue" onChange={(e)=>setRevenue(e.target.value)} style={inputStyle}/>
        <input placeholder="Expenses" onChange={(e)=>setExpenses(e.target.value)} style={inputStyle}/>
        <button style={btn} onClick={calculateIncome}>Calculate Net Income</button>
        <p><b>Net Income: {netIncome}</b></p>

        {/* Balance */}
        <h2>📘 Balance Sheet</h2>
        <input placeholder="Assets" onChange={(e)=>setAssets(e.target.value)} style={inputStyle}/>
        <input placeholder="Liabilities" onChange={(e)=>setLiabilities(e.target.value)} style={inputStyle}/>
        <button style={btn} onClick={checkBalance}>Check Equity</button>
        <p><b>Equity: {equityResult}</b></p>

        {/* Cash Flow */}
        <h2>💸 Cash Flow</h2>
        <input placeholder="Operating" onChange={(e)=>setOperating(e.target.value)} style={inputStyle}/>
        <input placeholder="Investing" onChange={(e)=>setInvesting(e.target.value)} style={inputStyle}/>
        <input placeholder="Financing" onChange={(e)=>setFinancing(e.target.value)} style={inputStyle}/>
        <button style={btn} onClick={calculateCashFlow}>Calculate Cash Flow</button>
        <p><b>Total Cash Flow: {cashFlow}</b></p>

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
  marginBottom: "10px"
};
