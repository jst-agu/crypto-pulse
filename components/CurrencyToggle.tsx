'use client';

type Props = {
  currency: 'usd' | 'ngn';
  setCurrency: (value: 'usd' | 'ngn') => void;
};

export default function CurrencyToggle({ currency, setCurrency }: Props) {
  return (
    <div className="flex items-center space-x-4 text-[--color-foreground]">
      <label className="text-sm font-medium">Currency:</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as 'usd' | 'ngn')}
        className="rounded border border-gray-300 px-2 py-1 text-sm bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="usd">USD ($)</option>
        <option value="ngn">NGN (₦)</option>
      </select>
    </div>
  );
}
