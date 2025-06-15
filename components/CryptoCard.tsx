import Image from 'next/image';
import { Coin } from '@/types/coin';
import Chart from './Chart';
import Link from 'next/link';

type Props = {
  coin: Coin;
  currency: 'usd' | 'ngn';
};

export default function CryptoCard({ coin, currency }: Props) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const currencySymbol = currency === 'usd' ? '$' : '₦';

  return (
    <Link
      href={`/coin/${coin.id}`}
      className="block rounded-xl bg-gray-800 dark:bg-gray-900 text-white p-5 shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        {/* Coin Info */}
        <div className="flex items-center gap-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={42}
            height={42}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>

        {/* Price Change */}
        <div
          title={`${coin.name} has moved ${isPositive ? 'up' : 'down'} ${coin.price_change_percentage_24h.toFixed(2)}% in the last 24h`}
          className={`text-sm px-2 py-1 rounded-full font-medium inline-flex items-center ${
            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {isPositive ? '+' : ''}
          {coin.price_change_percentage_24h.toFixed(2)}%
          <span className="ml-1">{isPositive ? '↗️' : '↘️'}</span>
        </div>
      </div>

      {/* Price + Chart */}
      <div>
        <p className="text-lg font-semibold">
          {currencySymbol}
          {coin.current_price.toLocaleString()}
        </p>
        <div className="mt-2">
          <Chart data={coin.sparkline_in_7d?.price ?? []} isPositive={isPositive} />
        </div>
      </div>
    </Link>
  );
}
