"use client";

import { useEffect, useState } from 'react';

interface Player {
  username: string;
  name: string | null;
  place: number | null;
}

interface ApiResponse {
  data: Player[];
  status?: string; // делаем необязательным
  count?: number;
}

export default function PlayerTop() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
        console.log('API Response:', result);
        
        // Проверяем наличие data массива в ответе
        if (result.data && Array.isArray(result.data)) {
          // Фильтруем игроков: убираем тех, у кого нет места (place) или place = null/0
          const filteredPlayers = result.data.filter(player => 
            player.place !== null && player.place !== undefined && player.place !== 0
          );
          
          // Сортируем по месту (по возрастанию)
          const sortedPlayers = filteredPlayers.sort((a, b) => (a.place || Infinity) - (b.place || Infinity));
          setPlayers(sortedPlayers);
        } 
        else {
          console.error('Invalid response format - missing data array:', result);
          throw new Error('Server returned invalid data format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="mt-24 text-center">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="mt-24 text-center text-red-500">Error: {error}</div>;
  }

  if (players.length === 0) {
    return (
      <div className="mt-24 text-center">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        <p>No ranked players found</p>
        <p className="text-sm text-gray-600 mt-2">
          Players need to have a valid ranking position to appear here
        </p>
      </div>
    );
  }

  return (
    <div className="mt-24 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
      <div className="bg-main-darklight rounded-lg shadow-md p-1 hover:scale-105 transition-transform">
        {players.map((player) => (
          <div key={`${player.username}-${player.place}`} className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
            <span className="text-xl font-bold text-white w-12 text-right mr-4">
              {player.place}.
            </span>
            <div className="flex-1">
              <span className="text-lg font-semibold text-white">
                {player.name || player.username}
              </span>
              {player.name && player.username && player.name !== player.username && (
                <span className="text-sm text-white/50 ml-2">
                  ({player.username})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}