import { Lightbulb, Gauge, ArrowUpRight } from 'lucide-react';

function formatPct(n) {
  return `${(n * 100).toFixed(1)}%`;
}

export default function InsightsPanel({ result }) {
  if (!result) return null;
  const { personalInflation, spendingShare, topSpends, topInflation, sustainX, sustainY, upgradeZ } = result;

  const entries = Object.entries(spendingShare).map(([k, v]) => ({
    category: k.replace(/([A-Z])/g, ' $1').trim(),
    share: v,
  }));

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700"><Gauge className="h-5 w-5" /></div>
          <h3 className="text-lg font-semibold text-gray-900">Your Personal Inflation</h3>
        </div>
        <p className="text-4xl font-bold text-gray-900">{(personalInflation * 100).toFixed(2)}%</p>
        <p className="mt-1 text-sm text-gray-500">Weighted by your real spending mix</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Sustain now (X)</p>
            <p className="text-lg font-semibold">₹{sustainX.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Next month sustain (Y)</p>
            <p className="text-lg font-semibold">₹{sustainY.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Upgrade target (Z)</p>
            <p className="text-lg font-semibold">₹{upgradeZ.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-700"><ArrowUpRight className="h-5 w-5" /></div>
          <h3 className="text-lg font-semibold text-gray-900">Spending Mix</h3>
        </div>

        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.category} className="flex items-center gap-3">
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(e.share * 100).toFixed(1)}%` }}
                />
              </div>
              <div className="w-40 text-sm text-gray-700">{e.category}</div>
              <div className="w-16 text-right text-sm text-gray-600">{formatPct(e.share)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-medium text-gray-700">Highest spend</p>
            <ul className="mt-1 space-y-1 text-gray-600">
              {topSpends.map((t) => (
                <li key={t.category} className="flex justify-between"><span>{t.category}</span><span>{formatPct(t.share)}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700">Highest inflation</p>
            <ul className="mt-1 space-y-1 text-gray-600">
              {topInflation.map((t) => (
                <li key={t.category} className="flex justify-between"><span>{t.category}</span><span>{formatPct(t.inflation)}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-2 text-amber-700"><Lightbulb className="h-5 w-5" /></div>
          <h3 className="text-lg font-semibold text-gray-900">Personalized Suggestions</h3>
        </div>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>Reduce spending in categories with high share and high inflation to curb next month costs.</li>
          <li>Maintain lifestyle by targeting Y. For an upgrade, aim for Z with balanced increases across essentials.</li>
          <li>Consider reallocating investments towards assets that historically outpace your personal inflation.</li>
        </ul>
      </div>
    </section>
  );
}
