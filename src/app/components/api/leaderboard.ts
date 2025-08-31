import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const leaderboardApi = {
  getLeaderboard: async (): Promise<{
    data: {
      username: string;
      name: string | null;
      place: number | null;
      country: string | null;
    }[];
    status?: string;
    count?: number;
  }> => {
    const response = await api.get('/leaderboard');
    return response.data;
  },
};