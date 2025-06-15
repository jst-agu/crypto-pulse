'use client';

import { useState } from 'react';
import CurrencyToggle from '@/components/CurrencyToggle';
import CryptoList from '@/components/CryptoList';
import DarkModeToggle from '@/components/DarkModeToggle';


export default function Home() {
  const [currency, setCurrency] = useState<'usd' | 'ngn'>('usd');

  return (
    <main className="min-h-screen bg-[--color-background] text-[--color-foreground] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Crypto Pulse</h1>

          <div className="flex gap-4">
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
            <DarkModeToggle />
          </div>
        </header>

        <CryptoList currency={currency} />
      </div>
    </main>
  );
}
