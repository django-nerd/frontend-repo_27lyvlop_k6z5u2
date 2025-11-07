import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export default function InvestmentRealityCheck() {
  const [assets, setAssets] = useState([
    { type: 'Stocks', amount: '' },
    { type: 'Mutual Funds', amount: '' },
    { type: 'Gold', amount: '' },
    { type: 'Real Estate', amount: '' },
    { type: 'Bonds', amount: '' },
    { type: 'Govt Securities', amount: '' },
  ]);

  const total = assets.reduce((sum, a) => sum + (Number(a.amount) || 0), 0);

  return (
    <section className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-2 text-violet-700"><BarChart3 className="h-5 w-5" /></div>
        <h3 className="text-lg font-semibold text-gray-900">Investment Reality Check</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {assets.map((a, idx) => (
          <div key={a.type} className="">
            <label className="block text-sm font-medium text-gray-700">{a.type}</label>
            <input
              type="number"
              value={a.amount}
              onChange={(e) => {
                const next = [...assets];
                next[idx] = { ...a, amount: e.target.value };
                setAssets(next);
              }}
              placeholder="0"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none ring-violet-200 focus:ring"
              min="0"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Total Invested</p>
          <p className="text-lg font-semibold">₹{total.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 md:col-span-2">
          <p className="text-sm text-gray-600">Insights coming soon</p>
          <p className="text-xs text-gray-500">We will benchmark your returns vs personal inflation and suggest healthy rebalancing — no trading advice, just rational diversification ideas.</p>
        </div>
      </div>
    </section>
  );
}
