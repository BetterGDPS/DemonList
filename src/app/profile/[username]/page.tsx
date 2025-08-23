"use client"

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Profile({ params }: { params: { username: string } }) {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/get/${params.username}`);
        if (res.status === 404) {
          setError("Account not found");
          setUsername(null);
          return;
        }
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setUsername(data.username);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    fetchUser();
  }, [params.username]);

  return (
    <div className="mt-28 text-center">
      {error ? error : username ? (
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 justify-center items-center flex-col bg-main-darklight p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <span className="text-xl">{username}</span>

            <hr className="border-white/20 border-1 w-96 m-2"/>

            <div className="flex flex-row gap-4 gap-x-12">
              <div className="flex flex-col">
                <span className="text-sm text-white/80">Place</span>
                <span>-</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-white/80">Name on BGDPS</span>
                <span>-</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-white/80">Hardest</span>
                <span>-</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center flex-col bg-main-darklight p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <span className="text-xl">Records</span>
            
            {/* <hr className="border-white/20 border-1 w-96 m-2"/> */}
            
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-white/20">
                    <th className="p-2 font-medium">Level</th>
                    <th className="p-2 font-medium">Progress</th>
                    <th className="p-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      ) : 
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-20 w-20 text-main-light" />
        </div>
      }
    </div>
  );
}