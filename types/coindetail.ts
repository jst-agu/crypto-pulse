export type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    market_cap: {
      usd: number;
      [key: string]: number;
    };
    total_volume: {
      usd: number;
      [key: string]: number;
    };
    price_change_percentage_24h: number;
  };
  error?: string;
};
