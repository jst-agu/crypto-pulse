import Image from 'next/image';
import Link from 'next/link';
import NotFound from '@/app/not-found';
import { CoinDetail } from '@/types/coindetail';
import ThemeToggleWrapper from '@/components/ThemeToggleWrapper';

// It's a good practice to define props for pages like this
type PageProps = {
  params: { id: string };
};

// Corrected the return type of the async function
async function fetchCoinDetails(id: string): Promise<CoinDetail | null> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        // It's better to throw an error or return null if the response is not ok
        return null;
    }

    const data = await res.json();
    if (data.error) return null;
    return data;
  } catch (error) {
    console.error('Failed to fetch coin details:', error);
    return null;
  }
}

export default async function CoinPage({ params }: PageProps) {
  const coin = await fetchCoinDetails(params.id);

  if (!coin) {
    return <NotFound />;
  }

  const price = coin.market_data.current_price.usd;
  const change = coin.market_data.price_change_percentage_24h;
  const positive = change >= 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                 <Image src={coin.image.large} alt={`${coin.name} logo`} width={50} height={50} />
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </h1>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                        Rank #{coin.market_cap_rank}
                    </span>
                 </div>
            </div>
             <ThemeToggleWrapper />
        </div>

        {/* Price Section */}
        <div className="mb-6">
            <p className="text-gray-500 dark:text-gray-400">Current Price</p>
            <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-bold text-gray-900 dark:text-white">${price.toLocaleString()}</span>
                 <span className={`text-lg font-semibold ${positive ? 'text-green-500' : 'text-red-500'}`}>
                    {positive ? '+' : ''}
                    {change.toFixed(2)}%
                    {positive ? ' ↗️' : ' ↘️'}
                 </span>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${coin.market_data.market_cap.usd.toLocaleString()}
                </p>
             </div>
             <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${coin.market_data.total_volume.usd.toLocaleString()}
                </p>
             </div>
        </div>

        {/* Description */}
        {coin.description.en && (
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">About {coin.name}</h2>
                <div
                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: coin.description.en }}
                 />
            </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
            <Link href="/" className="text-blue-500 hover:underline">
                ← Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}