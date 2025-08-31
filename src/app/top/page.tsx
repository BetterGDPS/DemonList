"use client";

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { leaderboardApi } from '../components/api/leaderboard';
import Twemoji from 'react-twemoji';

interface Player {
  username: string;
  name: string | null;
  place: number | null;
  country: string | null;
}

export default function PlayerTop() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        const result = await leaderboardApi.getLeaderboard();
        console.log('API Response:', result);
        
        if (result.data && Array.isArray(result.data)) {
          const filteredPlayers = result.data.filter(player => 
            player.place !== null && player.place !== undefined && player.place !== 0
          );
          
          const sortedPlayers = filteredPlayers.sort((a, b) => (a.place || Infinity) - (b.place || Infinity));
          setPlayers(sortedPlayers);
        } 
        else {
          console.error('Invalid response format - missing data array:', result);
          throw new Error('Server returned invalid data format');
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-36">
        <Loader2 className="animate-spin h-20 w-20 text-main-light" />
      </div>
    );
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
      <div className="bg-main-darklight rounded-lg shadow-md p-1 transition-transform">
        {players.map((player) => (
          <div key={`${player.username}-${player.place}`} className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
            <span className={`text-xl font-bold w-12 text-right mr-4 ${
              player.place === 1 ? 'text-top-gold' : 
              player.place === 2 ? 'text-top-silver' : 
              player.place === 3 ? 'text-top-bronze' :
              player.place === 4 ? 'text-top-copper' :
              player.place === 5 ? 'text-top-wood' : 'text-white'
            }`}>
              {player.place}.
            </span>
            <div className="flex items-center">
              {player.country && (
                <Twemoji options={{ className: 'twemoji' }} className="w-6 h-6 mr-2 select-none">
                  <span>
                    {player.country}
                  </span>
                </Twemoji>
              )}
              <span className="text-lg font-semibold text-white">
                {player.name ? player.name : (
                  <a href={`/profile/${player.username}`} className='hover:underline hover:text-white/80'>{player.username}</a>
                )}
              </span>
              {player.name != undefined && (
                <a className="text-sm text-white/50 ml-2 hover:underline hover:text-white/30" href={`/profile/${player.username}`}>
                  ({player.username})
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}