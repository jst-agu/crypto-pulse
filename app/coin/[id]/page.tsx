import Image from 'next/image';
import Link from 'next/link';
import NotFound from '@/app/not-found';
import { CoinDetail } from '@/types/coindetail';
import ThemeToggleWrapper from '@/components/ThemeToggleWrapper';


async function fetchCoinDetails(id: string): Promise<CoinDetail | null> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    if (!res.ok || data.error) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function CoinPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const coin = await fetchCoinDetails(id);
  if (!coin) return NotFound();

  const price = coin.market_data.current_price.usd;
  const change = coin.market_data.price_change_percentage_24h;
  const positive = change >= 0;

  return (
    <main className="bg-[--color-background] text-[--color-foreground]">
      <div className="min-h-screen bg-white text-black dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:text-white px-4 py-10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">

            <div className="flex justify-end mb-4">
                <ThemeToggleWrapper />
            </div>


          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">
                {coin.name} ({coin.symbol.toUpperCase()})
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rank #{coin.market_cap_rank}
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-md transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</p>
            <div className="flex items-center text-2xl font-semibold">
              ${price.toLocaleString()}
              <span
                title={`${coin.name} has moved ${positive ? 'up' : 'down'} ${change.toFixed(2)}% in the last 24 hours`}
                className={`ml-3 inline-flex items-center text-sm px-2 py-1 rounded-full ${
                  positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}
              >
                {positive ? '+' : ''}
                {change.toFixed(2)}%
                <span className="ml-1">{positive ? '↗️' : '↘️'}</span>
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
              <p className="text-lg font-bold">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
              <p className="text-lg font-bold">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Description */}
          {coin.description.en && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-lg font-semibold mb-2">About {coin.name}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: coin.description.en.split('. ')[0] + '.',
                }}
              />
            </div>
          )}

          {/* Back Link */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block text-sm text-yellow-500 hover:underline transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
