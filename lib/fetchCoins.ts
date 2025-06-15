import axios from 'axios';
import { Coin } from '@/types/coin';

export const fetchCoins = async (currency: 'usd' | 'ngn'): Promise<Coin[]> => {
  const url = `https://api.coingecko.com/api/v3/coins/markets`;
  const params = {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: 10,
    page: 1,
    sparkline: true,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
};
