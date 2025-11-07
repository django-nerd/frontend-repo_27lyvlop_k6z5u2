import { useState } from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

const defaultCategories = [
  { key: 'groceries', label: 'Food Groceries' },
  { key: 'eatingOut', label: 'Eating Out' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'transport', label: 'Fuel / Transport' },
  { key: 'rent', label: 'Rent' },
  { key: 'utilities', label: 'Utilities' },
];

export default function SpendingForm({ onAnalyze }) {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState(
    Object.fromEntries(defaultCategories.map(c => [c.key, '']))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedIncome = Number(income) || 0;
    const parsedExpenses = Object.fromEntries(
      Object.entries(expenses).map(([k, v]) => [k, Number(v) || 0])
    );
    onAnalyze({ income: parsedIncome, expenses: parsedExpenses });
  };

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-700"><Wallet className="h-5 w-5" /></div>
          <h2 className="text-xl font-semibold text-gray-900">Enter income and monthly spending</h2>
        </div>
        <div className="hidden items-center gap-2 text-sm text-gray-500 md:flex">
          <TrendingUp className="h-4 w-4" /> Personal inflation uses your spending mix
        </div>
      </div>

      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="50000"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none ring-blue-200 focus:ring"
            min="0"
          />
        </div>

        {defaultCategories.map((c) => (
          <div key={c.key}>
            <label className="block text-sm font-medium text-gray-700">{c.label}</label>
            <input
              type="number"
              value={expenses[c.key]}
              onChange={(e) => setExpenses({ ...expenses, [c.key]: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none ring-blue-200 focus:ring"
              min="0"
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 mt-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow hover:bg-blue-700"
          >
            Analyze Personal Inflation
          </button>
        </div>
      </form>
    </section>
  );
}
