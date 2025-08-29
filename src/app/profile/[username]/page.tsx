"use client"

import { Code2, Loader2, Monitor, TabletSmartphone, Triangle, Crown, ShieldUser, Settings, Ban } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type RecordType = {
  levelId: string;
  level: string;
  progress: number;
  status: string;
  video: string;
}

type BadgesType = {
  pc: boolean;
  mobile: boolean;
  dev: boolean;
  owner: boolean;
  staff: boolean;
  banned: boolean;
}

const ProgressBar = ({ progress }: { progress: number }) => {
  const isComplete = progress === 100;
  const colorClass = isComplete ? 'bg-green-500' : 'bg-blue-500';
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div 
        className={`${colorClass} h-4 rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      >
        <div className="text-xs text-white font-medium text-center leading-4 mx-1">
          {progress}%
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ 
  isOpen, 
  onClose, 
  badges,
  userId 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  badges: BadgesType | null;
  userId: string | null;
}) => {
  const [pcBadge, setPcBadge] = useState(false);
  const [mobileBadge, setMobileBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (badges) {
      setPcBadge(badges.pc);
      setMobileBadge(badges.mobile);
    }
  }, [badges]);

  const handleBadgeUpdate = async (badgeName: string, badgeValue: boolean) => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/update_badge/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          badge_name: badgeName,
          badge_value: badgeValue
        }),
      });

      if (!res.ok) throw new Error("Failed to update badge");
      
      if (badgeName === "pc") setPcBadge(badgeValue);
      if (badgeName === "mobile") setMobileBadge(badgeValue);
    } catch (err) {
      console.error("Error updating badge:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-main-darklight p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl mb-4">Profile Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              PC Player
            </label>
            <input
              type="checkbox"
              checked={pcBadge}
              onChange={(e) => handleBadgeUpdate("pc", e.target.checked)}
              disabled={isLoading}
              className="h-5 w-5 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <TabletSmartphone className="w-5 h-5" />
              Mobile Player
            </label>
            <input
              type="checkbox"
              checked={mobileBadge}
              onChange={(e) => handleBadgeUpdate("mobile", e.target.checked)}
              disabled={isLoading}
              className="h-5 w-5 rounded"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-main-light/50 hover:bg-main-light/30 px-4 py-2 rounded transition-colors"
            disabled={isLoading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Profile({ params }: { params: { username: string } }) {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [username, setUsername] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [hardest, setHardest] = useState<string | null>(null);
  const [place, setPlace] = useState<number | null>(null);
  const [records, setRecords] = useState<RecordType[] | null>(null);
  const [badges, setBadges] = useState<BadgesType | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
        setName(data.name);
        setUserID(data._id);
        setHardest(data.hardest);
        setPlace(data.place);

        if (data.records && typeof data.records === 'object' && data.records !== null) {
          const recordsArray = Object.entries(data.records).map(([levelId, recordData]) => ({
            levelId,
            ...(recordData as Omit<RecordType, 'levelId'>)
          }));
          setRecords(recordsArray);
        } else {
          setRecords(null);
        }

        setBadges({
          ...data.badges,
          banned: data.place === 0
        });
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setUsername(null);
      }
    }

    fetchUser();
  }, [params.username]);

  const isOwnProfile = isClerkLoaded && clerkUser && userID === clerkUser.id;

  return (
    <div className="mt-28 text-center">
      {error ? error : username ? (
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 justify-center items-center flex-col bg-main-darklight p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <div className="flex items-center gap-1">
              <span className={`text-xl ${badges?.banned ? 'line-through text-red-400' : ''}`}>{username}</span>
              {badges && (
                <span className="flex gap-1 ml-1">
                  {badges.owner && <Crown className="w-6 h-6 text-badges-owner"/>}
                  {badges.dev && <Code2 className="w-6 h-6 text-badges-code"/>}
                  {badges.staff && <ShieldUser className="w-6 h-6 text-badges-staff"/>}
                  {badges.banned && <Ban className="w-6 h-6 text-badges-ban"/>}
                  {badges.pc && <Monitor className="w-6 h-6"/>}
                  {badges.mobile && <TabletSmartphone className="w-6 h-6"/>}
                </span>
              )}
              {isOwnProfile && (
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="ml-2 p-1 bg-main-bg/50 hover:bg-white/10 rounded transition-colors"
                  title="Profile Settings"
                >
                  <Settings className="w-6 h-6" />
                </button>
              )}
            </div>

            <hr className="border-white/20 border-1 w-96 m-2"/>

            <div className="flex flex-row gap-4 gap-x-12">
              <div className="flex flex-col">
                <span className="text-sm text-white/80">Place</span>
                <span>{place ? place : "-"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-white/80">Name on BGDPS</span>
                <span>{name ? name : "-"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-white/80">Hardest</span>
                <span>{hardest ? hardest : "-"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center flex-col bg-main-darklight p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <span className="text-xl">Records</span>
                        
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-white/20">
                    <th className="p-2 font-medium">Level</th>
                    <th className="p-2 font-medium">Progress</th>
                    <th className="p-2 font-medium">Status</th>
                    <th className="p-2 font-medium">Video</th>
                  </tr>
                </thead>
                <tbody>
                  {records && records.length > 0 ? (
                    records.map((record, index) => (
                      <tr key={index} className="border-b border-white/10">
                        {record.level !== undefined && (
                          <>
                            <td className="p-2">
                              <a 
                                href={`/level/${record.levelId}`}
                                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                              >
                                {record.level}
                              </a>
                            </td>
                            <td className="p-2 w-32">
                              <ProgressBar progress={record.progress} />
                            </td>
                            <td className="p-2">{record.status}</td>
                            <td className="flex justify-center items-center p-2">
                              <a 
                                href={record.video ? record.video : ""} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex justify-center bg-blue-400 hover:bg-blue-500 transition-colors rounded-lg w-16"
                              >
                                <Triangle className="rotate-90 m-0.5"/>
                              </a>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-white/60">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            badges={badges}
            userId={userID}
          />
        </div>
      ) : 
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-20 w-20 text-main-light" />
        </div>
      }
    </div>
  );
}