import { useMemo, useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState("dark");

  const [financialOpen, setFinancialOpen] = useState(true);
  const [bankOpen, setBankOpen] = useState(true);
  const [tAccountOpen, setTAccountOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(true);

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

  const [selectedAccount, setSelectedAccount] = useState("Cash");
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

  const openAccountFromDashboard = (accountName, accountType) => {
    setSelectedAccount(accountName);
    setSelectedAccountType(accountType);
    setActivePage("taccounts");
  };

  const currentTheme = themes[theme];

  const menuButton = (label, pageKey) => (
    <button
      onClick={() => setActivePage(pageKey)}
      style={{
        ...baseStyles.subNavButton,
        color: currentTheme.subNavText,
        background: activePage === pageKey ? currentTheme.subNavActiveBg : "transparent",
        ...(activePage === pageKey ? { color: currentTheme.subNavActiveText } : {}),
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
        ...baseStyles.subNavButton,
        color: currentTheme.subNavText,
        background: selectedAccount === label ? currentTheme.subNavActiveBg : "transparent",
        ...(selectedAccount === label ? { color: currentTheme.subNavActiveText } : {}),
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        ...baseStyles.app,
        background: currentTheme.appBackground,
        color: currentTheme.textPrimary,
      }}
    >
      <aside
        style={{
          ...baseStyles.sidebar,
          background: currentTheme.sidebarBackground,
          borderRight: 1px solid ${currentTheme.sidebarBorder},
        }}
      >
        <div style={baseStyles.brandBox}>
          <img
            src="/publiclogo.png"
            alt="Accounting Hub Logo"
            style={baseStyles.logoImage}
          />
          <div>
            <div style={{ ...baseStyles.brandTitle, color: currentTheme.sidebarTitle }}>
              Accounting Hub
            </div>
            <div style={{ ...baseStyles.brandSub, color: currentTheme.sidebarSub }}>
              Professional Workspace
            </div>
          </div>
        </div>

        <button
          onClick={() => setActivePage("dashboard")}
          style={{
            ...baseStyles.navButton,
            background: activePage === "dashboard" ? currentTheme.navActiveBg : currentTheme.navBg,
            color: currentTheme.navText,
            border: 1px solid ${activePage === "dashboard" ? currentTheme.navActiveBorder : "transparent"},
          }}
        >
          Dashboard
        </button>

        <button
          onClick={() => setFinancialOpen(!financialOpen)}
          style={{
            ...baseStyles.navButton,
            background: currentTheme.navBg,
            color: currentTheme.navText,
          }}
        >
          Financial Statements
        </button>

        {financialOpen && (
          <div style={baseStyles.subMenu}>
            {menuButton("Income Statement - Service", "service")}
            {menuButton("Income Statement - Inventory", "inventory")}
            {menuButton("Statement of Financial Position", "sfp")}
            {menuButton("Cash Flow Statement", "cashflow")}
            {menuButton("Statement of Changes in Equity", "equityStatement")}
            {menuButton("Retained Earnings", "retainedEarnings")}
          </div>
        )}

        <button
          onClick={() => setBankOpen(!bankOpen)}
          style={{
            ...baseStyles.navButton,
            background: currentTheme.navBg,
            color: currentTheme.navText,
          }}
        >
          Bank Reconciliation
        </button>

        {bankOpen && (
          <div style={baseStyles.subMenu}>
            {menuButton("Bank Reconciliation Statement", "bankReconciliation")}
          </div>
        )}

        <button
          onClick={() => setTAccountOpen(!tAccountOpen)}
          style={{
            ...baseStyles.navButton,
            background: currentTheme.navBg,
            color: currentTheme.navText,
          }}
        >
          T Accounts
        </button>

        {tAccountOpen && (
          <div style={baseStyles.subMenu}>
            <button
              style={{ ...baseStyles.groupButton, color: currentTheme.groupText }}
              onClick={() => setAssetOpen(!assetOpen)}
            >
              Assets
            </button>
            {assetOpen && (
              <div style={baseStyles.subMenu}>
                {accountButton("Cash", "Assets")}
                {accountButton("Accounts Receivable", "Assets")}
                {accountButton("Notes Receivable", "Assets")}
                {accountButton("Supplies", "Assets")}
                {accountButton("Equipment", "Assets")}
              </div>
            )}

            <button
              style={{ ...baseStyles.groupButton, color: currentTheme.groupText }}
              onClick={() => setLiabilityOpen(!liabilityOpen)}
            >
              Liabilities
            </button>
            {liabilityOpen && (
              <div style={baseStyles.subMenu}>
                {accountButton("Accounts Payable", "Liabilities")}
                {accountButton("Notes Payable", "Liabilities")}
                {accountButton("Unearned Revenue", "Liabilities")}
              </div>
            )}

            <button
              style={{ ...baseStyles.groupButton, color: currentTheme.groupText }}
              onClick={() => setEquityOpen(!equityOpen)}
            >
              Equity
            </button>
            {equityOpen && (
              <div style={baseStyles.subMenu}>
                {accountButton("Owner Capital", "Equity")}
                {accountButton("Owner Drawings", "Equity")}
              </div>
            )}

            <button
              style={{ ...baseStyles.groupButton, color: currentTheme.groupText }}
              onClick={() => setRevenueOpen(!revenueOpen)}
            >
              Revenue
            </button>
            {revenueOpen && (
              <div style={baseStyles.subMenu}>
                {accountButton("Service Revenue", "Revenue")}
                {accountButton("Sales Revenue", "Revenue")}
              </div>
            )}

            <button
              style={{ ...baseStyles.groupButton, color: currentTheme.groupText }}
              onClick={() => setExpenseOpen(!expenseOpen)}
            >
              Expenses
            </button>
            {expenseOpen && (
              <div style={baseStyles.subMenu}>
                {accountButton("Rent Expense", "Expense")}
                {accountButton("Salary Expense", "Expense")}
                {accountButton("Utilities Expense", "Expense")}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          style={{
            ...baseStyles.navButton,
            background: currentTheme.navBg,
            color: currentTheme.navText,
          }}
        >
          Settings
        </button>

        {settingsOpen && (
          <div style={baseStyles.subMenu}>
            <div
              style={{
                ...baseStyles.groupButton,
                color: currentTheme.groupText,
                cursor: "default",
              }}
            >
              Lighting
            </div>

            <button
              onClick={() => setTheme("dark")}
              style={{
                ...baseStyles.subNavButton,
                color: currentTheme.subNavText,
                background: theme === "dark" ? currentTheme.subNavActiveBg : "transparent",
                ...(theme === "dark" ? { color: currentTheme.subNavActiveText } : {}),
              }}
            >
              Dark
            </button>

            <button
              onClick={() => setTheme("light")}
              style={{
                ...baseStyles.subNavButton,
                color: currentTheme.subNavText,
                background: theme === "light" ? currentTheme.subNavActiveBg : "transparent",
                ...(theme === "light" ? { color: currentTheme.subNavActiveText } : {}),
              }}
            >
              Light
            </button>
          </div>
        )}

        <button
          onClick={() => setActivePage("about")}
          style={{
            ...baseStyles.navButton,
            background: currentTheme.navBg,
            color: currentTheme.navText,
          }}
        >
          About Us
        </button>
      </aside>

      <main style={baseStyles.main}>
        <header
          style={{
            ...baseStyles.header,
            background: currentTheme.headerBg,
            boxShadow: currentTheme.shadow,
          }}
        >
          <div>
            <h1 style={{ ...baseStyles.pageTitle, color: currentTheme.textPrimary }}>
              Accounting Hub
            </h1>
            <p style={{ ...baseStyles.pageSubtitle, color: currentTheme.textSecondary }}>
              Designed like a professional accounting dashboard.
            </p>
          </div>
          <div
            style={{
              ...baseStyles.headerBadge,
              background: currentTheme.badgeBg,
              color: currentTheme.badgeText,
            }}
          >
            by Kareem Abdelmajeed
          </div>
        </header>

        {activePage === "dashboard" && (
          <>
            <section
              style={{
                ...baseStyles.hero,
                background: currentTheme.heroBg,
              }}
            >
              <div style={{ ...baseStyles.heroTag, background: currentTheme.heroTagBg }}>
                Enterprise Layout
              </div>
              <h2 style={baseStyles.heroTitle}>
                Financial reporting, bank reconciliation, and T-accounts in one system.
              </h2>
              <p style={baseStyles.heroText}>
                Use the sidebar to move between statements, bank reconciliation, direct T-account pages, and lighting settings.
              </p>
            </section>

            <section style={baseStyles.cardGrid}>
              <Card
                title="Service Net Income"
                value={serviceNetIncome}
                subtitle="Revenue - Expenses"
                theme={currentTheme}
              />
              <Card
                title="Inventory Net Income"
                value={inventoryNetIncome}
                subtitle="Sales - COGS - Expenses"
                theme={currentTheme}
              />
              <Card
                title="Total Cash Flow"
                value={totalCashFlow}
                subtitle="Operating + Investing + Financing"
                theme={currentTheme}
              />
              <Card
                title="Adjusted Bank Balance"
                value={adjustedBankBalance}
                subtitle="Bank reconciliation"
                theme={currentTheme}
              />
            </section>

            <div style={{ marginTop: 28 }}>
              <h3 style={{ ...baseStyles.quickTitle, color: currentTheme.textPrimary }}>
                Quick Account Access
              </h3>
              <div style={baseStyles.cardGrid}>
                <AccountBox
                  title="Cash"
                  value={0}
                  subtitle="Asset account"
                  onClick={() => openAccountFromDashboard("Cash", "Assets")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Accounts Receivable"
                  value={0}
                  subtitle="Asset account"
                  onClick={() => openAccountFromDashboard("Accounts Receivable", "Assets")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Notes Receivable"
                  value={0}
                  subtitle="Asset account"
                  onClick={() => openAccountFromDashboard("Notes Receivable", "Assets")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Accounts Payable"
                  value={0}
                  subtitle="Liability account"
                  onClick={() => openAccountFromDashboard("Accounts Payable", "Liabilities")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Notes Payable"
                  value={0}
                  subtitle="Liability account"
                  onClick={() => openAccountFromDashboard("Notes Payable", "Liabilities")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Owner Capital"
                  value={0}
                  subtitle="Equity account"
                  onClick={() => openAccountFromDashboard("Owner Capital", "Equity")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Service Revenue"
                  value={0}
                  subtitle="Revenue account"
                  onClick={() => openAccountFromDashboard("Service Revenue", "Revenue")}
                  theme={currentTheme}
                />
                <AccountBox
                  title="Rent Expense"
                  value={0}
                  subtitle="Expense account"
                  onClick={() => openAccountFromDashboard("Rent Expense", "Expense")}
                  theme={currentTheme}
                />
              </div>
            </div>
          </>
        )}

        {activePage === "service" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Income Statement - Service Company"
              desc="For businesses that provide services and do not sell inventory."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Inputs</h3>
                <Input
                  label="Service Revenue"
                  value={serviceRevenue}
                  setValue={setServiceRevenue}
                  theme={currentTheme}
                />
                <Input
                  label="Operating Expenses"
                  value={serviceExpenses}
                  setValue={setServiceExpenses}
                  theme={currentTheme}
                />
              </Panel>
              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Results</h3>
                <ResultBox label="Net Income" value={serviceNetIncome} strong theme={currentTheme} />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "inventory" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Income Statement - Inventory Company"
              desc="For merchandising companies that use sales revenue and cost of goods sold."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Inputs</h3>
                <Input
                  label="Sales Revenue"
                  value={salesRevenue}
                  setValue={setSalesRevenue}
                  theme={currentTheme}
                />
                <Input label="Cost of Goods Sold" value={cogs} setValue={setCogs} theme={currentTheme} />
                <Input
                  label="Operating Expenses"
                  value={inventoryExpenses}
                  setValue={setInventoryExpenses}
                  theme={currentTheme}
                />
              </Panel>
              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Results</h3>
                <ResultBox label="Gross Profit" value={inventoryGrossProfit} theme={currentTheme} />
                <ResultBox label="Net Income" value={inventoryNetIncome} strong theme={currentTheme} />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "sfp" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Statement of Financial Position"
              desc="Review whether assets equal liabilities plus equity."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <Input label="Assets" value={assets} setValue={setAssets} theme={currentTheme} />
                <Input label="Liabilities" value={liabilities} setValue={setLiabilities} theme={currentTheme} />
                <Input label="Equity" value={equity} setValue={setEquity} theme={currentTheme} />
              </Panel>
              <Panel theme={currentTheme}>
                <ResultBox label="Assets" value={Number(assets || 0)} theme={currentTheme} />
                <ResultBox
                  label="Liabilities + Equity"
                  value={Number(liabilities || 0) + Number(equity || 0)}
                  theme={currentTheme}
                />
                <ResultBox
                  label="Status"
                  value={balanceCheck === 0 ? "Balanced correctly" : Difference: ${balanceCheck}}
                  strong
                  theme={currentTheme}
                />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "cashflow" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Cash Flow Statement"
              desc="Track operating, investing, and financing sections."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <Input
                  label="Operating Cash Flow"
                  value={operatingCash}
                  setValue={setOperatingCash}
                  theme={currentTheme}
                />
                <Input
                  label="Investing Cash Flow"
                  value={investingCash}
                  setValue={setInvestingCash}
                  theme={currentTheme}
                />
                <Input
                  label="Financing Cash Flow"
                  value={financingCash}
                  setValue={setFinancingCash}
                  theme={currentTheme}
                />
              </Panel>
              <Panel theme={currentTheme}>
                <ResultBox label="Total Cash Flow" value={totalCashFlow} strong theme={currentTheme} />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "equityStatement" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Statement of Changes in Equity"
              desc="Track changes in owner equity across the period."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <Input
                  label="Beginning Capital"
                  value={beginningCapital}
                  setValue={setBeginningCapital}
                  theme={currentTheme}
                />
                <Input
                  label="Additional Investment"
                  value={additionalInvestment}
                  setValue={setAdditionalInvestment}
                  theme={currentTheme}
                />
                <Input
                  label="Net Income"
                  value={netIncomeEquity}
                  setValue={setNetIncomeEquity}
                  theme={currentTheme}
                />
                <Input label="Drawings" value={drawings} setValue={setDrawings} theme={currentTheme} />
              </Panel>
              <Panel theme={currentTheme}>
                <ResultBox label="Ending Equity" value={endingEquity} strong theme={currentTheme} />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "retainedEarnings" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Retained Earnings Statement"
              desc="Track beginning retained earnings, net income, and dividends."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <Input
                  label="Beginning Retained Earnings"
                  value={beginningRE}
                  setValue={setBeginningRE}
                  theme={currentTheme}
                />
                <Input label="Net Income" value={netIncomeRE} setValue={setNetIncomeRE} theme={currentTheme} />
                <Input label="Dividends" value={dividendsRE} setValue={setDividendsRE} theme={currentTheme} />
              </Panel>
              <Panel theme={currentTheme}>
                <ResultBox
                  label="Ending Retained Earnings"
                  value={endingRetainedEarnings}
                  strong
                  theme={currentTheme}
                />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "bankReconciliation" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="Bank Reconciliation Statement"
              desc="Compare the adjusted bank balance and adjusted book balance."
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Bank Side</h3>
                <Input label="Bank Balance" value={bankBalance} setValue={setBankBalance} theme={currentTheme} />
                <Input
                  label="Deposits in Transit"
                  value={depositsInTransit}
                  setValue={setDepositsInTransit}
                  theme={currentTheme}
                />
                <Input
                  label="Outstanding Checks"
                  value={outstandingChecks}
                  setValue={setOutstandingChecks}
                  theme={currentTheme}
                />
              </Panel>

              <Panel theme={currentTheme}>
                <h3 style={{ ...baseStyles.panelTitle, color: currentTheme.textPrimary }}>Book Side</h3>
                <Input label="Book Balance" value={bookBalance} setValue={setBookBalance} theme={currentTheme} />
                <Input
                  label="Bank Service Charge"
                  value={bankServiceCharge}
                  setValue={setBankServiceCharge}
                  theme={currentTheme}
                />
                <Input label="NSF Check" value={nsfCheck} setValue={setNsfCheck} theme={currentTheme} />
                <Input
                  label="Interest Earned"
                  value={interestEarned}
                  setValue={setInterestEarned}
                  theme={currentTheme}
                />
              </Panel>
            </div>

            <div style={{ marginTop: 20 }}>
              <ResultBox label="Adjusted Bank Balance" value={adjustedBankBalance} theme={currentTheme} />
              <ResultBox label="Adjusted Book Balance" value={adjustedBookBalance} theme={currentTheme} />
              <ResultBox
                label="Reconciliation Status"
                value={reconciliationDifference === 0 ? "Reconciled correctly" : Difference: ${reconciliationDifference}}
                strong
                theme={currentTheme}
              />
            </div>
          </SectionShell>
        )}

        {activePage === "taccounts" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title={T Account - ${selectedAccount}}
              desc={Category: ${selectedAccountType}. Click any account name in the sidebar or dashboard to move directly to it.}
              theme={currentTheme}
            />
            <div style={baseStyles.twoCol}>
              <Panel theme={currentTheme}>
                <Input label="Debit 1" value={tDebit1} setValue={setTDebit1} theme={currentTheme} />
                <Input label="Debit 2" value={tDebit2} setValue={setTDebit2} theme={currentTheme} />
                <Input label="Credit 1" value={tCredit1} setValue={setTCredit1} theme={currentTheme} />
                <Input label="Credit 2" value={tCredit2} setValue={setTCredit2} theme={currentTheme} />
              </Panel>
              <Panel theme={currentTheme}>
                <div style={{ ...baseStyles.tAccount, border: 1px solid ${currentTheme.panelBorder} }}>
                  <div style={{ ...baseStyles.tSide, background: currentTheme.panelBg }}>
                    <div style={{ ...baseStyles.tHeading, color: currentTheme.textPrimary }}>Debits</div>
                    <div style={{ ...baseStyles.tValue, color: currentTheme.blueStrong }}>{totalDebits}</div>
                  </div>
                  <div style={{ ...baseStyles.tDivider, background: currentTheme.textPrimary }}></div>
                  <div style={{ ...baseStyles.tSide, background: currentTheme.panelBg }}>
                    <div style={{ ...baseStyles.tHeading, color: currentTheme.textPrimary }}>Credits</div>
                    <div style={{ ...baseStyles.tValue, color: currentTheme.blueStrong }}>{totalCredits}</div>
                  </div>
                </div>
                <ResultBox label="Balance" value={tBalance} strong theme={currentTheme} />
              </Panel>
            </div>
          </SectionShell>
        )}

        {activePage === "about" && (
          <SectionShell theme={currentTheme}>
            <SectionTitle
              title="About Us"
              desc="Learn more about Accounting Hub and its purpose."
              theme={currentTheme}
            />

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <img
                src="/publiclogo.png"
                alt="Accounting Hub Logo"
                style={baseStyles.aboutLogo}
              />
            </div>

            <div
              style={{
                ...baseStyles.aboutText,
                color: currentTheme.textPrimary,
                background: currentTheme.panelBg,
                border: 1px solid ${currentTheme.panelBorder},
              }}
            >
              <p>
                Accounting Hub is an interactive platform designed to make accounting simple,
                organized, and easy to navigate. The system is built so users can quickly move
                between financial statements, T-accounts, and bank reconciliation without confusion.
              </p>

              <p>
                The goal of this website is to provide a smooth and user-friendly experience,
                where students can focus on understanding accounting concepts instead of struggling
                with complex layouts. Every section is structured clearly to allow fast access and
                efficient workflow.
              </p>

              <p>
                This project was developed by Kareem Abdelmajeed, a first-year accounting student
                at Princess Sumaya University for Technology (PSUT), as part of building practical
                skills and creating a tool that makes accounting more accessible and intuitive.
              </p>
            </div>
          </SectionShell>
        )}
      </main>
    </div>
  );
}

function SectionShell({ children, theme }) {
  return (
    <section
      style={{
        ...baseStyles.section,
        background: theme.sectionBg,
        boxShadow: theme.shadow,
      }}
    >
      {children}
    </section>
  );
}

function SectionTitle({ title, desc, theme }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ ...baseStyles.sectionTitle, color: theme.textPrimary }}>{title}</h2>
      <p style={{ ...baseStyles.sectionDesc, color: theme.textSecondary }}>{desc}</p>
    </div>
  );
}

function Card({ title, value, subtitle, theme }) {
  return (
    <div
      style={{
        ...baseStyles.summaryCard,
        background: theme.cardBg,
        boxShadow: theme.shadow,
      }}
    >
      <div style={{ ...baseStyles.summaryTitle, color: theme.textSecondary }}>{title}</div>
      <div style={{ ...baseStyles.summaryValue, color: theme.textPrimary }}>{formatNumber(value)}</div>
      <div style={{ ...baseStyles.summarySub, color: theme.textMuted }}>{subtitle}</div>
    </div>
  );
}

function AccountBox({ title, value, subtitle, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...baseStyles.accountBox,
        background: theme.cardBg,
        border: 1px solid ${theme.panelBorder},
        boxShadow: theme.shadow,
      }}
    >
      <div style={{ ...baseStyles.summaryTitle, color: theme.textSecondary }}>{title}</div>
      <div style={{ ...baseStyles.summaryValue, color: theme.textPrimary }}>{formatNumber(value)}</div>
      <div style={{ ...baseStyles.summarySub, color: theme.textMuted }}>{subtitle}</div>
    </button>
  );
}

function Panel({ children, theme }) {
  return (
    <div
      style={{
        ...baseStyles.panel,
        background: theme.panelBg,
        border: 1px solid ${theme.panelBorder},
      }}
    >
      {children}
    </div>
  );
}

function Input({ label, value, setValue, theme }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ ...baseStyles.label, color: theme.labelColor }}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          ...baseStyles.input,
          background: theme.inputBg,
          border: 1px solid ${theme.inputBorder},
          color: theme.textPrimary,
        }}
        type="number"
        placeholder={Enter ${label.toLowerCase()}}
      />
    </div>
  );
}

function ResultBox({ label, value, strong = false, theme }) {
  return (
    <div
      style={{
        ...baseStyles.resultBox,
        background: strong ? theme.resultStrongBg : theme.resultBg,
        border: 1px solid ${strong ? theme.resultStrongBorder : theme.panelBorder},
        color: theme.textPrimary,
      }}
    >
      <span>{label}</span>
      <span>{typeof value === "number" ? formatNumber(value) : value}</span>
    </div>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value || 0);
}

const themes = {
  dark: {
    appBackground: "linear-gradient(135deg, #020617 0%, #0f172a 32%, #111827 32%, #0b1220 100%)",
    sidebarBackground: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    sidebarBorder: "rgba(255,255,255,0.08)",
    sidebarTitle: "#ffffff",
    sidebarSub: "#94a3b8",
    navBg: "rgba(255,255,255,0.04)",
    navText: "#ffffff",
    navActiveBg: "linear-gradient(90deg, rgba(59,130,246,0.28), rgba(56,189,248,0.18))",
    navActiveBorder: "rgba(147,197,253,0.5)",
    subNavText: "#cbd5e1",
    subNavActiveBg: "rgba(59,130,246,0.22)",
    subNavActiveText: "#ffffff",
    groupText: "#cbd5e1",
    headerBg: "rgba(15,23,42,0.88)",
    badgeBg: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
    badgeText: "#ffffff",
    heroBg: "linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)",
    heroTagBg: "rgba(255,255,255,0.14)",
    cardBg: "rgba(15,23,42,0.92)",
    sectionBg: "rgba(15,23,42,0.88)",
    panelBg: "#0f172a",
    panelBorder: "#1e293b",
    inputBg: "#111827",
    inputBorder: "#334155",
    resultBg: "#111827",
    resultStrongBg: "linear-gradient(135deg, rgba(29,78,216,0.35), rgba(56,189,248,0.18))",
    resultStrongBorder: "#3b82f6",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#94a3b8",
    labelColor: "#cbd5e1",
    blueStrong: "#60a5fa",
    shadow: "0 12px 40px rgba(2,6,23,0.45)",
  },
  light: {
    appBackground: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 16%, #f8fafc 16%, #f1f5f9 100%)",
    sidebarBackground: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    sidebarBorder: "rgba(255,255,255,0.08)",
    sidebarTitle: "#ffffff",
    sidebarSub: "#94a3b8",
    navBg: "rgba(255,255,255,0.04)",
    navText: "#ffffff",
    navActiveBg: "linear-gradient(90deg, rgba(59,130,246,0.28), rgba(56,189,248,0.18))",
    navActiveBorder: "rgba(147,197,253,0.5)",
    subNavText: "#cbd5e1",
    subNavActiveBg: "rgba(59,130,246,0.22)",
    subNavActiveText: "#ffffff",
    groupText: "#cbd5e1",
    headerBg: "rgba(255,255,255,0.9)",
    badgeBg: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    badgeText: "#0f172a",
    heroBg: "linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)",
    heroTagBg: "rgba(255,255,255,0.14)",
    cardBg: "rgba(255,255,255,0.95)",
    sectionBg: "rgba(255,255,255,0.88)",
    panelBg: "#ffffff",
    panelBorder: "#e2e8f0",
    inputBg: "#f8fafc",
    inputBorder: "#cbd5e1",
    resultBg: "#f8fafc",
    resultStrongBg: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
    resultStrongBorder: "#93c5fd",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#64748b",
    labelColor: "#334155",
    blueStrong: "#1d4ed8",
    shadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
};

const baseStyles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: 320,
    padding: 24,
    overflowY: "auto",
  },
  brandBox: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 28,
  },
  logoImage: {
    width: 54,
    height: 54,
    borderRadius: 14,
    objectFit: "cover",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
    background: "#fff",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  brandSub: {
    fontSize: 12,
    marginTop: 4,
  },
  navButton: {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: 14,
    border: "none",
    marginBottom: 10,
    cursor: "pointer",
    fontSize: 15,
  },
  groupButton: {
    width: "100%",
    textAlign: "left",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
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
    marginBottom: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  main: {
    flex: 1,
    padding: 30,
  },
  header: {
    borderRadius: 24,
    padding: 26,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
  },
  pageSubtitle: {
    margin: "8px 0 0 0",
  },
  headerBadge: {
    padding: "10px 14px",
    borderRadius: 999,
    fontWeight: 600,
  },
  hero: {
    color: "white",
    borderRadius: 28,
    padding: 32,
    marginBottom: 24,
  },
  heroTag: {
    display: "inline-block",
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
  quickTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
  },
  summaryCard: {
    borderRadius: 22,
    padding: 22,
  },
  accountBox: {
    borderRadius: 22,
    padding: 22,
    cursor: "pointer",
    textAlign: "left",
  },
  summaryTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },
  summarySub: {
    fontSize: 13,
  },
  section: {
    borderRadius: 28,
    padding: 28,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
  },
  sectionDesc: {
    margin: "8px 0 0 0",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
  },
  panel: {
    borderRadius: 22,
    padding: 22,
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
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    boxSizing: "border-box",
  },
  resultBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    padding: "14px 16px",
    borderRadius: 14,
    fontWeight: 600,
  },
  tAccount: {
    display: "grid",
    gridTemplateColumns: "1fr 4px 1fr",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    minHeight: 170,
  },
  tSide: {
    padding: 22,
  },
  tDivider: {},
  tHeading: {
    fontWeight: 700,
    marginBottom: 24,
    fontSize: 18,
  },
  tValue: {
    fontSize: 30,
    fontWeight: 800,
  },
  aboutLogo: {
    width: 220,
    maxWidth: "100%",
    borderRadius: 20,
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)",
    background: "transparent",
  },
  aboutText: {
    lineHeight: 1.9,
    maxWidth: 900,
    padding: 24,
    borderRadius: 20,
    fontSize: 16,
  },
};
