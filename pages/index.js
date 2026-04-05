import { useMemo, useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const [serviceRevenue, setServiceRevenue] = useState("");
  const [serviceExpenses, setServiceExpenses] = useState("");

  const [salesRevenue, setSalesRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [inventoryExpenses, setInventoryExpenses] = useState("");

  const [assets, setAssets] = useState("");
  const [liabilities, setLiabilities] = useState("");
  const [equity, setEquity] = useState("");

  const [operatingCash, setOperatingCash] = useState("");
  const [investingCash, setInvestingCash] = useState("");
  const [financingCash, setFinancingCash] = useState("");

  const [tDebit1, setTDebit1] = useState("");
  const [tDebit2, setTDebit2] = useState("");
  const [tCredit1, setTCredit1] = useState("");
  const [tCredit2, setTCredit2] = useState("");

  const [beforeRevenue, setBeforeRevenue] = useState("");
  const [beforeExpenses, setBeforeExpenses] = useState("");
  const [adjustments, setAdjustments] = useState("");

  const serviceNetIncome = useMemo(() => {
    return Number(serviceRevenue || 0) - Number(serviceExpenses || 0);
  }, [serviceRevenue, serviceExpenses]);

  const inventoryGrossProfit = useMemo(() => {
    return Number(salesRevenue || 0) - Number(cogs || 0);
  }, [salesRevenue, cogs]);

  const inventoryNetIncome = useMemo(() => {
    return inventoryGrossProfit - Number(inventoryExpenses || 0);
  }, [inventoryGrossProfit, inventoryExpenses]);

  const balanceCheck = useMemo(() => {
    return Number(assets || 0) - (Number(liabilities || 0) + Number(equity || 0));
  }, [assets, liabilities, equity]);

  const totalCashFlow = useMemo(() => {
    return (
      Number(operatingCash || 0) +
      Number(investingCash || 0) +
      Number(financingCash || 0)
    );
  }, [operatingCash, investingCash, financingCash]);

  const totalDebits = useMemo(() => {
    return Number(tDebit1 || 0) + Number(tDebit2 || 0);
  }, [tDebit1, tDebit2]);

  const totalCredits = useMemo(() => {
    return Number(tCredit1 || 0) + Number(tCredit2 || 0);
  }, [tCredit1, tCredit2]);

  const tBalance = useMemo(() => {
    return totalDebits - totalCredits;
  }, [totalDebits, totalCredits]);

  const incomeBeforeAdjustments = useMemo(() => {
    return Number(beforeRevenue || 0) - Number(beforeExpenses || 0);
  }, [beforeRevenue, beforeExpenses]);

  const incomeAfterAdjustments = useMemo(() => {
    return Number(beforeRevenue || 0) - (Number(beforeExpenses || 0) + Number(adjustments || 0));
  }, [beforeRevenue, beforeExpenses, adjustments]);

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "statements", label: "Financial Statements" },
    { key: "service", label: "Service Company" },
    { key: "inventory", label: "Inventory Company" },
    { key: "taccounts", label: "T Accounts" },
    { key: "adjustments", label: "Adjusting Entries" },
  ];

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brandBox}>
          <div style={styles.brandIcon}>AH</div>
          <div>
            <div style={styles.brandTitle}>Accounting Hub</div>
            <div style={styles.brandSub}>Enterprise Edition</div>
          </div>
        </div>

        <div style={styles.navTitle}>Workspace</div>
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              ...styles.navButton,
              ...(activePage === item.key ? styles.navButtonActive : {}),
            }}
          >
            {item.label}
          </button>
        ))}

        <div style={styles.sidebarFooter}>
          <div style={styles.firmCard}>
            <div style={styles.firmCardTitle}>Built for professional use</div>
            <div style={styles.firmCardText}>
              Financial statements, T-accounts, and adjusting-entry support in one place.
            </div>
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Accounting Hub</h1>
            <p style={styles.pageSubtitle}>
              Professional accounting workspace for reporting, analysis, and closing preparation.
            </p>
          </div>
          <div style={styles.headerBadge}>by Kareem Abdelmajeed</div>
        </header>

        {activePage === "dashboard" && (
          <>
            <section style={styles.hero}>
              <div>
                <div style={styles.heroTag}>Professional Accounting Platform</div>
                <h2 style={styles.heroTitle}>
                  A cleaner, smarter way to manage accounting workflows.
                </h2>
                <p style={styles.heroText}>
                  Use one platform for service company statements, merchandising company statements,
                  T-accounts, and before-and-after adjusting entry analysis.
                </p>
              </div>
            </section>

            <section style={styles.cardGrid}>
              <Card title="Service Income Statement" value={serviceNetIncome} subtitle="Revenue - Expenses" />
              <Card title="Inventory Net Income" value={inventoryNetIncome} subtitle="Sales - COGS - Expenses" />
              <Card title="Cash Flow Total" value={totalCashFlow} subtitle="Operating + Investing + Financing" />
              <Card
                title="Balance Sheet Status"
                value={balanceCheck === 0 ? "Balanced" : "Unbalanced"}
                subtitle="Assets = Liabilities + Equity"
                isText
              />
            </section>
          </>
        )}

        {activePage === "statements" && (
          <section style={styles.section}>
            <SectionTitle
              title="Financial Statements"
              desc="Review the three core financial statements in one professional dashboard."
            />
            <div style={styles.cardGrid}>
              <Panel>
                <h3 style={styles.panelTitle}>Income Statement</h3>
                <p style={styles.panelText}>
                  Used to measure profitability across a period.
                </p>
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Balance Sheet</h3>
                <p style={styles.panelText}>
                  Shows assets, liabilities, and owner’s equity at a point in time.
                </p>
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Cash Flow Statement</h3>
                <p style={styles.panelText}>
                  Tracks operating, investing, and financing cash activity.
                </p>
              </Panel>
            </div>

            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Balance Sheet Checker</h3>
                <Input label="Assets" value={assets} setValue={setAssets} />
                <Input label="Liabilities" value={liabilities} setValue={setLiabilities} />
                <Input label="Equity" value={equity} setValue={setEquity} />
                <ResultBox
                  label="Status"
                  value={balanceCheck === 0 ? "Balanced correctly" : `Difference: ${balanceCheck}`}
                />
              </Panel>

              <Panel>
                <h3 style={styles.panelTitle}>Cash Flow Statement</h3>
                <Input label="Operating Cash Flow" value={operatingCash} setValue={setOperatingCash} />
                <Input label="Investing Cash Flow" value={investingCash} setValue={setInvestingCash} />
                <Input label="Financing Cash Flow" value={financingCash} setValue={setFinancingCash} />
                <ResultBox label="Total Cash Flow" value={totalCashFlow} />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "service" && (
          <section style={styles.section}>
            <SectionTitle
              title="Service Company Income Statement"
              desc="Designed for businesses that earn revenue from services instead of selling inventory."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Inputs</h3>
                <Input label="Service Revenue" value={serviceRevenue} setValue={setServiceRevenue} />
                <Input label="Operating Expenses" value={serviceExpenses} setValue={setServiceExpenses} />
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Results</h3>
                <ResultBox label="Service Revenue" value={Number(serviceRevenue || 0)} />
                <ResultBox label="Operating Expenses" value={Number(serviceExpenses || 0)} />
                <ResultBox label="Net Income" value={serviceNetIncome} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "inventory" && (
          <section style={styles.section}>
            <SectionTitle
              title="Inventory Company Income Statement"
              desc="Built for merchandising businesses that calculate gross profit and net income."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Inputs</h3>
                <Input label="Sales Revenue" value={salesRevenue} setValue={setSalesRevenue} />
                <Input label="Cost of Goods Sold" value={cogs} setValue={setCogs} />
                <Input
                  label="Operating Expenses"
                  value={inventoryExpenses}
                  setValue={setInventoryExpenses}
                />
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Results</h3>
                <ResultBox label="Sales Revenue" value={Number(salesRevenue || 0)} />
                <ResultBox label="COGS" value={Number(cogs || 0)} />
                <ResultBox label="Gross Profit" value={inventoryGrossProfit} />
                <ResultBox label="Operating Expenses" value={Number(inventoryExpenses || 0)} />
                <ResultBox label="Net Income" value={inventoryNetIncome} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "taccounts" && (
          <section style={styles.section}>
            <SectionTitle
              title="T Accounts"
              desc="Use this area to compare total debits and total credits in a simple T-account view."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>T-Account Entry</h3>
                <Input label="Debit 1" value={tDebit1} setValue={setTDebit1} />
                <Input label="Debit 2" value={tDebit2} setValue={setTDebit2} />
                <Input label="Credit 1" value={tCredit1} setValue={setTCredit1} />
                <Input label="Credit 2" value={tCredit2} setValue={setTCredit2} />
              </Panel>

              <Panel>
                <h3 style={styles.panelTitle}>T-Account Summary</h3>
                <div style={styles.tAccount}>
                  <div style={styles.tSide}>
                    <div style={styles.tHeading}>Debits</div>
                    <div style={styles.tValue}>{totalDebits}</div>
                  </div>
                  <div style={styles.tDivider}></div>
                  <div style={styles.tSide}>
                    <div style={styles.tHeading}>Credits</div>
                    <div style={styles.tValue}>{totalCredits}</div>
                  </div>
                </div>
                <ResultBox label="Account Balance" value={tBalance} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "adjustments" && (
          <section style={styles.section}>
            <SectionTitle
              title="Before and After Adjusting Entries"
              desc="Compare net income before adjustments and after recording period-end adjustments."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Before Adjustments</h3>
                <Input label="Revenue Before Adjustments" value={beforeRevenue} setValue={setBeforeRevenue} />
                <Input label="Expenses Before Adjustments" value={beforeExpenses} setValue={setBeforeExpenses} />
                <ResultBox label="Income Before Adjustments" value={incomeBeforeAdjustments} />
              </Panel>

              <Panel>
                <h3 style={styles.panelTitle}>After Adjustments</h3>
                <Input label="Adjusting Entries Total" value={adjustments} setValue={setAdjustments} />
                <ResultBox label="Income After Adjustments" value={incomeAfterAdjustments} strong />
              </Panel>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function SectionTitle({ title, desc }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionDesc}>{desc}</p>
    </div>
  );
}

function Card({ title, value, subtitle, isText = false }) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryTitle}>{title}</div>
      <div style={styles.summaryValue}>
        {isText ? value : typeof value === "number" ? formatNumber(value) : value}
      </div>
      <div style={styles.summarySub}>{subtitle}</div>
    </div>
  );
}

function Panel({ children }) {
  return <div style={styles.panel}>{children}</div>;
}

function Input({ label, value, setValue }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={styles.label}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.input}
        type="number"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

function ResultBox({ label, value, strong = false }) {
  return (
    <div style={{ ...styles.resultBox, ...(strong ? styles.resultStrong : {}) }}>
      <span>{label}</span>
      <span>{typeof value === "number" ? formatNumber(value) : value}</span>
    </div>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 35%, #e5e7eb 35%, #f8fafc 100%)",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#0f172a",
  },
  sidebar: {
    width: 290,
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#ffffff",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },
  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: 18,
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  brandSub: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  navTitle: {
    color: "#94a3b8",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  navButton: {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: 14,
    border: "none",
    background: "transparent",
    color: "#e5e7eb",
    marginBottom: 8,
    cursor: "pointer",
    fontSize: 15,
    transition: "0.2s",
  },
  navButtonActive: {
    background: "linear-gradient(90deg, rgba(59,130,246,0.22), rgba(56,189,248,0.18))",
    color: "#ffffff",
    boxShadow: "inset 0 0 0 1px rgba(125,211,252,0.22)",
  },
  sidebarFooter: {
    marginTop: "auto",
  },
  firmCard: {
    background: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 16,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  firmCardTitle: {
    fontWeight: 700,
    marginBottom: 8,
  },
  firmCardText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 1.5,
  },
  main: {
    flex: 1,
    padding: 30,
  },
  header: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(10px)",
    borderRadius: 24,
    padding: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
    marginBottom: 24,
    gap: 20,
  },
  pageTitle: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
  },
  pageSubtitle: {
    margin: "8px 0 0 0",
    color: "#475569",
    fontSize: 15,
  },
  headerBadge: {
    background: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    color: "#0f172a",
    padding: "10px 14px",
    borderRadius: 999,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  hero: {
    background: "linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)",
    color: "white",
    borderRadius: 28,
    padding: 32,
    boxShadow: "0 18px 50px rgba(15,23,42,0.18)",
    marginBottom: 24,
  },
  heroTag: {
    display: "inline-block",
    background: "rgba(255,255,255,0.14)",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 12,
    marginBottom: 14,
  },
  heroTitle: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.2,
    maxWidth: 720,
  },
  heroText: {
    marginTop: 14,
    maxWidth: 760,
    color: "rgba(255,255,255,0.88)",
    lineHeight: 1.7,
    fontSize: 15,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginBottom: 24,
  },
  summaryCard: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  summaryTitle: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },
  summarySub: {
    color: "#64748b",
    fontSize: 13,
  },
  section: {
    background: "rgba(255,255,255,0.82)",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
  },
  sectionDesc: {
    margin: "8px 0 0 0",
    color: "#64748b",
    fontSize: 15,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
  },
  panel: {
    background: "#ffffff",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
    border: "1px solid #e2e8f0",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: 18,
    fontSize: 22,
    fontWeight: 700,
  },
  panelText: {
    color: "#475569",
    lineHeight: 1.6,
    fontSize: 15,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: 15,
    background: "#f8fafc",
    boxSizing: "border-box",
  },
  resultBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    padding: "14px 16px",
    borderRadius: 14,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontWeight: 600,
  },
  resultStrong: {
    background: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    border: "1px solid #93c5fd",
  },
  tAccount: {
    display: "grid",
    gridTemplateColumns: "1fr 4px 1fr",
    alignItems: "stretch",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid #cbd5e1",
    marginBottom: 18,
    minHeight: 170,
  },
  tSide: {
    padding: 22,
    background: "#ffffff",
  },
  tDivider: {
    background: "#0f172a",
  },
  tHeading: {
    fontWeight: 700,
    marginBottom: 24,
    fontSize: 18,
  },
  tValue: {
    fontSize: 30,
    fontWeight: 800,
    color: "#1d4ed8",
  },
};
