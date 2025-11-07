import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import SpendingForm from './components/SpendingForm';
import InsightsPanel from './components/InsightsPanel';
import InvestmentRealityCheck from './components/InvestmentRealityCheck';

// Temporary local computation to simulate backend results.
// Once backend endpoints are ready, replace this with API calls.
const categoryInflationFallback = {
  groceries: 0.06,
  eatingOut: 0.07,
  shopping: 0.04,
  transport: 0.05,
  rent: 0.03,
  utilities: 0.02,
};

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = ({ income, expenses }) => {
    const totalExpense = Object.values(expenses).reduce((a, b) => a + b, 0);
    const share = Object.fromEntries(
      Object.entries(expenses).map(([k, v]) => [k, totalExpense ? v / totalExpense : 0])
    );

    const weightedInflation = Object.entries(share).reduce((acc, [k, s]) => {
      const catInf = categoryInflationFallback[k] ?? 0.03; // fallback
      return acc + s * catInf;
    }, 0);

    const topSpends = Object.entries(share)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => ({ category: k.replace(/([A-Z])/g, ' $1').trim(), share: v }));

    const topInflation = Object.entries(categoryInflationFallback)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => ({ category: k.replace(/([A-Z])/g, ' $1').trim(), inflation: v }));

    const sustainX = totalExpense;
    const sustainY = Math.round(totalExpense * (1 + weightedInflation));
    const upgradeZ = Math.round(totalExpense * (1 + weightedInflation + 0.05));

    setAnalysis({
      personalInflation: weightedInflation,
      spendingShare: share,
      topSpends,
      topInflation,
      sustainX,
      sustainY,
      upgradeZ,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50">
      <header className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600" />
            <span className="text-lg font-bold tracking-tight">InflateWise</span>
          </div>
          <div className="flex items-center gap-3">
            {authed ? (
              <span className="text-sm text-gray-600">Welcome back</span>
            ) : (
              <button onClick={() => setAuthed(true)} className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">Sign in</button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-6 pb-24 md:px-10">
        <Hero onFakeAuth={() => setAuthed(true)} />
        <SpendingForm onAnalyze={handleAnalyze} />
        <InsightsPanel result={analysis} />
        <InvestmentRealityCheck />
      </main>

      <footer className="border-t border-gray-200/70 bg-white/60 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} InflateWise. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
