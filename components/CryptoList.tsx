'use client';
export const dynamic = 'force-dynamic';


import { useEffect, useState } from 'react';
import { fetchCoins } from '@/lib/fetchCoins';
import { Coin } from '@/types/coin';
import CryptoCard from './CryptoCard';

type Props = {
  currency: 'usd' | 'ngn';
};

export default function CryptoList({ currency }: Props) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCoins(currency);
      setCoins(data);
      setLoading(false);
    };

    loadData();
  }, [currency]);

  if (loading) {
    return <p className="text-gray-600">Loading coins...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} currency={currency} />
      ))}
    </div>
  );
}
