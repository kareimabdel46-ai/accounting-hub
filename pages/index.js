import { useMemo, useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const [financialOpen, setFinancialOpen] = useState(true);
  const [bankOpen, setBankOpen] = useState(true);
  const [tAccountOpen, setTAccountOpen] = useState(true);

  const [assetOpen, setAssetOpen] = useState(true);
  const [liabilityOpen, setLiabilityOpen] = useState(false);
  const [equityOpen, setEquityOpen] = useState(false);
  const [revenueOpen, setRevenueOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

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

  const [beginningCapital, setBeginningCapital] = useState("");
  const [additionalInvestment, setAdditionalInvestment] = useState("");
  const [netIncomeEquity, setNetIncomeEquity] = useState("");
  const [drawings, setDrawings] = useState("");

  const [beginningRE, setBeginningRE] = useState("");
  const [netIncomeRE, setNetIncomeRE] = useState("");
  const [dividendsRE, setDividendsRE] = useState("");

  const [bookBalance, setBookBalance] = useState("");
  const [bankBalance, setBankBalance] = useState("");
  const [depositsInTransit, setDepositsInTransit] = useState("");
  const [outstandingChecks, setOutstandingChecks] = useState("");
  const [bankServiceCharge, setBankServiceCharge] = useState("");
  const [nsfCheck, setNsfCheck] = useState("");
  const [interestEarned, setInterestEarned] = useState("");

  const [selectedAccount, setSelectedAccount] = useState("Accounts Receivable");
  const [selectedAccountType, setSelectedAccountType] = useState("Assets");

  const [tDebit1, setTDebit1] = useState("");
  const [tDebit2, setTDebit2] = useState("");
  const [tCredit1, setTCredit1] = useState("");
  const [tCredit2, setTCredit2] = useState("");

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
    return Number(operatingCash || 0) + Number(investingCash || 0) + Number(financingCash || 0);
  }, [operatingCash, investingCash, financingCash]);

  const endingEquity = useMemo(() => {
    return (
      Number(beginningCapital || 0) +
      Number(additionalInvestment || 0) +
      Number(netIncomeEquity || 0) -
      Number(drawings || 0)
    );
  }, [beginningCapital, additionalInvestment, netIncomeEquity, drawings]);

  const endingRetainedEarnings = useMemo(() => {
    return Number(beginningRE || 0) + Number(netIncomeRE || 0) - Number(dividendsRE || 0);
  }, [beginningRE, netIncomeRE, dividendsRE]);

  const adjustedBankBalance = useMemo(() => {
    return (
      Number(bankBalance || 0) +
      Number(depositsInTransit || 0) -
      Number(outstandingChecks || 0)
    );
  }, [bankBalance, depositsInTransit, outstandingChecks]);

  const adjustedBookBalance = useMemo(() => {
    return (
      Number(bookBalance || 0) -
      Number(bankServiceCharge || 0) -
      Number(nsfCheck || 0) +
      Number(interestEarned || 0)
    );
  }, [bookBalance, bankServiceCharge, nsfCheck, interestEarned]);

  const reconciliationDifference = useMemo(() => {
    return adjustedBankBalance - adjustedBookBalance;
  }, [adjustedBankBalance, adjustedBookBalance]);

  const totalDebits = useMemo(() => {
    return Number(tDebit1 || 0) + Number(tDebit2 || 0);
  }, [tDebit1, tDebit2]);

  const totalCredits = useMemo(() => {
    return Number(tCredit1 || 0) + Number(tCredit2 || 0);
  }, [tCredit1, tCredit2]);

  const tBalance = useMemo(() => {
    return totalDebits - totalCredits;
  }, [totalDebits, totalCredits]);

  const menuButton = (label, pageKey) => (
    <button
      onClick={() => setActivePage(pageKey)}
      style={{
        ...styles.subNavButton,
        ...(activePage === pageKey ? styles.subNavButtonActive : {}),
      }}
    >
      {label}
    </button>
  );

  const accountButton = (label, type) => (
    <button
      onClick={() => {
        setSelectedAccount(label);
        setSelectedAccountType(type);
        setActivePage("taccounts");
      }}
      style={{
        ...styles.subNavButton,
        ...(selectedAccount === label ? styles.subNavButtonActive : {}),
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brandBox}>
          <div style={styles.brandIcon}>AH</div>
          <div>
            <div style={styles.brandTitle}>Accounting Hub</div>
            <div style={styles.brandSub}>Professional Workspace</div>
          </div>
        </div>

        <button
          onClick={() => setActivePage("dashboard")}
          style={{
            ...styles.navButton,
            ...(activePage === "dashboard" ? styles.navButtonActive : {}),
          }}
        >
          Dashboard
        </button>

        <button onClick={() => setFinancialOpen(!financialOpen)} style={styles.navButton}>
          Financial Statements
        </button>

        {financialOpen && (
          <div style={styles.subMenu}>
            {menuButton("Income Statement - Service", "service")}
            {menuButton("Income Statement - Inventory", "inventory")}
            {menuButton("Statement of Financial Position", "sfp")}
            {menuButton("Cash Flow Statement", "cashflow")}
            {menuButton("Statement of Changes in Equity", "equityStatement")}
            {menuButton("Retained Earnings", "retainedEarnings")}
          </div>
        )}

        <button onClick={() => setBankOpen(!bankOpen)} style={styles.navButton}>
          Bank Reconciliation
        </button>

        {bankOpen && (
          <div style={styles.subMenu}>
            {menuButton("Bank Reconciliation Statement", "bankReconciliation")}
          </div>
        )}

        <button onClick={() => setTAccountOpen(!tAccountOpen)} style={styles.navButton}>
          T Accounts
        </button>

        {tAccountOpen && (
          <div style={styles.subMenu}>
            <button onClick={() => setAssetOpen(!assetOpen)} style={styles.groupButton}>
              Assets
            </button>
            {assetOpen && (
              <div style={styles.subMenu}>
                {accountButton("Accounts Receivable", "Assets")}
                {accountButton("Notes Receivable", "Assets")}
                {accountButton("Cash", "Assets")}
                {accountButton("Supplies", "Assets")}
                {accountButton("Equipment", "Assets")}
              </div>
            )}

            <button onClick={() => setLiabilityOpen(!liabilityOpen)} style={styles.groupButton}>
              Liabilities
            </button>
            {liabilityOpen && (
              <div style={styles.subMenu}>
                {accountButton("Accounts Payable", "Liabilities")}
                {accountButton("Notes Payable", "Liabilities")}
                {accountButton("Unearned Revenue", "Liabilities")}
              </div>
            )}

            <button onClick={() => setEquityOpen(!equityOpen)} style={styles.groupButton}>
              Equity
            </button>
            {equityOpen && (
              <div style={styles.subMenu}>
                {accountButton("Owner Capital", "Equity")}
                {accountButton("Owner Drawings", "Equity")}
              </div>
            )}

            <button onClick={() => setRevenueOpen(!revenueOpen)} style={styles.groupButton}>
              Revenue
            </button>
            {revenueOpen && (
              <div style={styles.subMenu}>
                {accountButton("Service Revenue", "Revenue")}
                {accountButton("Sales Revenue", "Revenue")}
              </div>
            )}

            <button onClick={() => setExpenseOpen(!expenseOpen)} style={styles.groupButton}>
              Expenses
            </button>
            {expenseOpen && (
              <div style={styles.subMenu}>
                {accountButton("Rent Expense", "Expense")}
                {accountButton("Salary Expense", "Expense")}
                {accountButton("Utilities Expense", "Expense")}
              </div>
            )}
          </div>
        )}
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Accounting Hub</h1>
            <p style={styles.pageSubtitle}>
              Designed like a professional accounting dashboard.
            </p>
          </div>
          <div style={styles.headerBadge}>by Kareem Abdelmajeed</div>
        </header>

        {activePage === "dashboard" && (
          <>
            <section style={styles.hero}>
              <div style={styles.heroTag}>Enterprise Layout</div>
              <h2 style={styles.heroTitle}>
                Financial reporting, bank reconciliation, and T-accounts in one system.
              </h2>
              <p style={styles.heroText}>
                Use the sidebar to move between statements, bank reconciliation, and direct T-account pages.
              </p>
            </section>

            <section style={styles.cardGrid}>
              <Card title="Service Net Income" value={serviceNetIncome} subtitle="Revenue - Expenses" />
              <Card title="Inventory Net Income" value={inventoryNetIncome} subtitle="Sales - COGS - Expenses" />
              <Card title="Total Cash Flow" value={totalCashFlow} subtitle="Operating + Investing + Financing" />
              <Card title="Adjusted Bank Balance" value={adjustedBankBalance} subtitle="Bank reconciliation" />
            </section>
          </>
        )}

        {activePage === "service" && (
          <section style={styles.section}>
            <SectionTitle
              title="Income Statement - Service Company"
              desc="For businesses that provide services and do not sell inventory."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Inputs</h3>
                <Input label="Service Revenue" value={serviceRevenue} setValue={setServiceRevenue} />
                <Input label="Operating Expenses" value={serviceExpenses} setValue={setServiceExpenses} />
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Results</h3>
                <ResultBox label="Net Income" value={serviceNetIncome} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "inventory" && (
          <section style={styles.section}>
            <SectionTitle
              title="Income Statement - Inventory Company"
              desc="For merchandising companies that use sales revenue and cost of goods sold."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Inputs</h3>
                <Input label="Sales Revenue" value={salesRevenue} setValue={setSalesRevenue} />
                <Input label="Cost of Goods Sold" value={cogs} setValue={setCogs} />
                <Input label="Operating Expenses" value={inventoryExpenses} setValue={setInventoryExpenses} />
              </Panel>
              <Panel>
                <h3 style={styles.panelTitle}>Results</h3>
                <ResultBox label="Gross Profit" value={inventoryGrossProfit} />
                <ResultBox label="Net Income" value={inventoryNetIncome} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "sfp" && (
          <section style={styles.section}>
            <SectionTitle
              title="Statement of Financial Position"
              desc="Review whether assets equal liabilities plus equity."
            />
            <div style={styles.twoCol}>
              <Panel>
                <Input label="Assets" value={assets} setValue={setAssets} />
                <Input label="Liabilities" value={liabilities} setValue={setLiabilities} />
                <Input label="Equity" value={equity} setValue={setEquity} />
              </Panel>
              <Panel>
                <ResultBox label="Assets" value={Number(assets || 0)} />
                <ResultBox label="Liabilities + Equity" value={Number(liabilities || 0) + Number(equity || 0)} />
                <ResultBox
                  label="Status"
                  value={balanceCheck === 0 ? "Balanced correctly" : `Difference: ${balanceCheck}`}
                  strong
                />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "cashflow" && (
          <section style={styles.section}>
            <SectionTitle
              title="Cash Flow Statement"
              desc="Track operating, investing, and financing sections."
            />
            <div style={styles.twoCol}>
              <Panel>
                <Input label="Operating Cash Flow" value={operatingCash} setValue={setOperatingCash} />
                <Input label="Investing Cash Flow" value={investingCash} setValue={setInvestingCash} />
                <Input label="Financing Cash Flow" value={financingCash} setValue={setFinancingCash} />
              </Panel>
              <Panel>
                <ResultBox label="Total Cash Flow" value={totalCashFlow} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "equityStatement" && (
          <section style={styles.section}>
            <SectionTitle
              title="Statement of Changes in Equity"
              desc="Track changes in owner equity across the period."
            />
            <div style={styles.twoCol}>
              <Panel>
                <Input label="Beginning Capital" value={beginningCapital} setValue={setBeginningCapital} />
                <Input label="Additional Investment" value={additionalInvestment} setValue={setAdditionalInvestment} />
                <Input label="Net Income" value={netIncomeEquity} setValue={setNetIncomeEquity} />
                <Input label="Drawings" value={drawings} setValue={setDrawings} />
              </Panel>
              <Panel>
                <ResultBox label="Ending Equity" value={endingEquity} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "retainedEarnings" && (
          <section style={styles.section}>
            <SectionTitle
              title="Retained Earnings Statement"
              desc="Track beginning retained earnings, net income, and dividends."
            />
            <div style={styles.twoCol}>
              <Panel>
                <Input label="Beginning Retained Earnings" value={beginningRE} setValue={setBeginningRE} />
                <Input label="Net Income" value={netIncomeRE} setValue={setNetIncomeRE} />
                <Input label="Dividends" value={dividendsRE} setValue={setDividendsRE} />
              </Panel>
              <Panel>
                <ResultBox label="Ending Retained Earnings" value={endingRetainedEarnings} strong />
              </Panel>
            </div>
          </section>
        )}

        {activePage === "bankReconciliation" && (
          <section style={styles.section}>
            <SectionTitle
              title="Bank Reconciliation Statement"
              desc="Compare the adjusted bank balance and adjusted book balance."
            />
            <div style={styles.twoCol}>
              <Panel>
                <h3 style={styles.panelTitle}>Bank Side</h3>
                <Input label="Bank Balance" value={bankBalance} setValue={setBankBalance} />
                <Input label="Deposits in Transit" value={depositsInTransit} setValue={setDepositsInTransit} />
                <Input label="Outstanding Checks" value={outstandingChecks} setValue={setOutstandingChecks} />
              </Panel>

              <Panel>
                <h3 style={styles.panelTitle}>Book Side</h3>
                <Input label="Book Balance" value={bookBalance} setValue={setBookBalance} />
                <Input label="Bank Service Charge" value={bankServiceCharge} setValue={setBankServiceCharge} />
                <Input label="NSF Check" value={nsfCheck} setValue={setNsfCheck} />
                <Input label="Interest Earned" value={interestEarned} setValue={setInterestEarned} />
              </Panel>
            </div>

            <div style={{ marginTop: 20 }}>
              <ResultBox label="Adjusted Bank Balance" value={adjustedBankBalance} />
              <ResultBox label="Adjusted Book Balance" value={adjustedBookBalance} />
              <ResultBox
                label="Reconciliation Status"
                value={reconciliationDifference === 0 ? "Reconciled correctly" : `Difference: ${reconciliationDifference}`}
                strong
              />
            </div>
          </section>
        )}

        {activePage === "taccounts" && (
          <section style={styles.section}>
            <SectionTitle
              title={`T Account - ${selectedAccount}`}
              desc={`Category: ${selectedAccountType}. Click any account name in the sidebar to move directly to it.`}
            />
            <div style={styles.twoCol}>
              <Panel>
                <Input label="Debit 1" value={tDebit1} setValue={setTDebit1} />
                <Input label="Debit 2" value={tDebit2} setValue={setTDebit2} />
                <Input label="Credit 1" value={tCredit1} setValue={setTCredit1} />
                <Input label="Credit 2" value={tCredit2} setValue={setTCredit2} />
              </Panel>
              <Panel>
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
                <ResultBox label="Balance" value={tBalance} strong />
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

function Card({ title, value, subtitle }) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryTitle}>{title}</div>
      <div style={styles.summaryValue}>{formatNumber(value)}</div>
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
  return new Intl.NumberFormat("en-US").format(value || 0);
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "linear-gradient(135deg, #0f172a 0%, #111827 35%, #e5e7eb 35%, #f8fafc 100%)",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  sidebar: {
    width: 320,
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#fff",
    padding: 24,
    borderRight: "1px solid rgba(255,255,255,0.08)",
    overflowY: "auto",
  },
  brandBox: {
    display: "flex",
    gap: 14,
    alignItems: "center",
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
    fontWeight: 700,
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
  navButton: {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: 14,
    border: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    marginBottom: 10,
    cursor: "pointer",
    fontSize: 15,
  },
  navButtonActive: {
    background: "linear-gradient(90deg, rgba(59,130,246,0.28), rgba(56,189,248,0.18))",
  },
  groupButton: {
    width: "100%",
    textAlign: "left",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
    color: "#cbd5e1",
    marginBottom: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
  },
  subMenu: {
    marginLeft: 12,
    marginBottom: 12,
  },
  subNavButton: {
    width: "100%",
    textAlign: "left",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
    color: "#cbd5e1",
    marginBottom: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  subNavButtonActive: {
    background: "rgba(59,130,246,0.22)",
    color: "#fff",
  },
  main: {
    flex: 1,
    padding: 30,
  },
  header: {
    background: "rgba(255,255,255,0.84)",
    borderRadius: 24,
    padding: 26,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
  },
  pageTitle: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
  },
  pageSubtitle: {
    margin: "8px 0 0 0",
    color: "#475569",
  },
  headerBadge: {
    background: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    padding: "10px 14px",
    borderRadius: 999,
    fontWeight: 600,
  },
  hero: {
    background: "linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)",
    color: "white",
    borderRadius: 28,
    padding: 32,
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
  },
  heroText: {
    marginTop: 14,
    lineHeight: 1.7,
    maxWidth: 760,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
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
    background: "rgba(255,255,255,0.84)",
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
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
  },
  panel: {
    background: "#fff",
    borderRadius: 22,
    padding: 22,
    border: "1px solid #e2e8f0",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: 18,
    fontSize: 22,
    fontWeight: 700,
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
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid #cbd5e1",
    marginBottom: 18,
    minHeight: 170,
  },
  tSide: {
    padding: 22,
    background: "#fff",
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
