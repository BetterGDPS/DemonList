"use client"

import { Code2, Loader2, Monitor, TabletSmartphone, Triangle, Crown, ShieldUser, Settings, Ban, X, FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { profileApi, RecordType, BadgesType } from "../../components/api/profile";
import Image from "next/image";
import Twemoji from 'react-twemoji';

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
  userId,
  about: initialAbout
}: { 
  isOpen: boolean; 
  onClose: () => void;
  badges: BadgesType | null;
  userId: string | null;
  about: string | null;
}) => {
  const [pcBadge, setPcBadge] = useState(false);
  const [mobileBadge, setMobileBadge] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [originalAboutText, setOriginalAboutText] = useState("");
  const [originalPcBadge, setOriginalPcBadge] = useState(false);
  const [originalMobileBadge, setOriginalMobileBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (badges) {
      setPcBadge(badges.pc);
      setMobileBadge(badges.mobile);
      setOriginalPcBadge(badges.pc);
      setOriginalMobileBadge(badges.mobile);
    }
    setAboutText(initialAbout || "");
    setOriginalAboutText(initialAbout || "");
  }, [badges, initialAbout]);

  useEffect(() => {
    const badgesChanged = pcBadge !== originalPcBadge || mobileBadge !== originalMobileBadge;
    const aboutChanged = aboutText !== originalAboutText;
    setHasUnsavedChanges(badgesChanged || aboutChanged);
  }, [pcBadge, mobileBadge, aboutText, originalPcBadge, originalMobileBadge, originalAboutText]);

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(e.target.value);
  };

  const handleBadgeToggle = (badgeName: string, newValue: boolean) => {
    if (badgeName === "pc") setPcBadge(newValue);
    if (badgeName === "mobile") setMobileBadge(newValue);
  };

  const handleSave = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      if (pcBadge !== originalPcBadge) {
        await profileApi.updateBadge(userId, "pc", pcBadge);
        setOriginalPcBadge(pcBadge);
      }
      if (mobileBadge !== originalMobileBadge) {
        await profileApi.updateBadge(userId, "mobile", mobileBadge);
        setOriginalMobileBadge(mobileBadge);
      }
      
      if (aboutText !== originalAboutText) {
        await profileApi.updateAbout(userId, aboutText);
        setOriginalAboutText(aboutText);
      }
      
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close without saving?");
      if (confirmClose) {
        if (badges) {
          setPcBadge(originalPcBadge);
          setMobileBadge(originalMobileBadge);
        }
        setAboutText(originalAboutText);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-main-darklight p-4 sm:p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Profile Settings</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Note (max {!!badges?.staff ? '50' : '25'} characters)</label>
            <textarea
              value={aboutText}
              onChange={handleAboutChange}
              maxLength={!!badges?.staff ? 50 : 25}
              rows={3}
              className="w-full bg-main-bg/50 border border-white/20 rounded p-2 text-sm resize-none"
              placeholder="Tell others a bit about yourself..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text/plain');
                const cleanedText = pastedText.replace(/[\n\r]/g, '');
                document.execCommand('insertText', false, cleanedText);
              }}
            />
            <div className="text-xs text-white/60 text-right mt-1">
              {aboutText.length}/{!!badges?.staff ? '50' : '25'}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm sm:text-base">
              <Monitor className="w-5 h-5" />
              PC Player
            </label>
            <input
              type="checkbox"
              checked={pcBadge}
              onChange={(e) => handleBadgeToggle("pc", e.target.checked)}
              disabled={isLoading}
              className="h-5 w-5 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm sm:text-base">
              <TabletSmartphone className="w-5 h-5" />
              Mobile Player
            </label>
            <input
              type="checkbox"
              checked={mobileBadge}
              onChange={(e) => handleBadgeToggle("mobile", e.target.checked)}
              disabled={isLoading}
              className="h-5 w-5 rounded"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="bg-main-light/50 hover:bg-main-light/30 px-4 py-2 rounded transition-colors text-sm sm:text-base"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !hasUnsavedChanges}
            className="bg-main-light hover:bg-main-light/80 px-4 py-2 rounded transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

type ProfileBadgeProps = {
  icon: React.ElementType;
  label: string;
  colorClass: string;
  className?: string;
};

const ProfileBadge = ({ icon: Icon, label, colorClass, className = "" }: ProfileBadgeProps) => (
  <span className="relative group">
    <Icon
      className={`w-5 h-5 sm:w-6 sm:h-6 hover:scale-[115%] transition-all ${colorClass} ${className}`}
    />
    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[99999]">
      {label}
    </span>
  </span>
);

function renderAbout(about: string, isStaff: boolean) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (isStaff && urlRegex.test(about)) {
    const parts = about.split(urlRegex);
    return parts.map((part, idx) =>
      urlRegex.test(part) ? (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline hover:text-blue-200 transition-colors"
        >
          {part}
        </a>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  }
  return about;
}

export default function Profile({ params }: { params: { username: string } }) {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [username, setUsername] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [hardest, setHardest] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);
  const [specialAbout, setSpecialAbout] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [place, setPlace] = useState<number | null>(null);
  const [records, setRecords] = useState<RecordType[] | null>(null);
  const [badges, setBadges] = useState<BadgesType | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await profileApi.getUserProfile(params.username);
        
        setUsername(data.username);
        setName(data.name);
        setUserID(data._id);
        setHardest(data.hardest);
        setPlace(data.place);
        setAvatar(data.avatar);
        setAbout(data.about);
        setSpecialAbout(data.specialAbout);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError("Account not found");
        } else {
          setError(err.response?.data?.message || err.message || "Failed to fetch profile");
        }
        setUsername(null);
      }
    }

    fetchUser();
  }, [params.username]);

  const isOwnProfile = isClerkLoaded && clerkUser && userID === clerkUser.id;

  return (
    <div className="mt-20 sm:mt-28 text-center px-4">
      <title>{`${username}'s Profile`}</title>
      {error ? (
        <div className="text-red-400 text-lg">{error}</div>
      ) : username ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="bg-main-darklight p-4 sm:p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Image
                  src={avatar || '/default-avatar.jpg'}
                  alt="Profile Avatar"
                  width={30}
                  height={30}
                  className="rounded-full border-1 border-main-light"
                />
                <span className={`flex items-center text-lg sm:text-xl ${badges?.banned ? 'line-through text-red-400' : ''}`}>
                  {username}
                  {badges && badges.country && (
                    <span className="relative group flex flex-row">
                      <Twemoji options={{ className: 'twemoji w-6 h-6 mx-1 select-none' }}>
                        <span className="flex flex-row">{badges.country}</span>
                      </Twemoji>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[99999]">
                        Player Country
                      </span>
                    </span>
                  )}
                </span>
                {badges && (
                  <span className="flex gap-1 flex-wrap justify-center items-center">
                    {badges.owner && (
                      <ProfileBadge
                        icon={Crown}
                        label="Owner"
                        colorClass="text-badges-owner"
                      />
                    )}
                    {badges.dev && (
                      <ProfileBadge
                        icon={Code2}
                        label="Developer"
                        colorClass="text-badges-code"
                      />
                    )}
                    {badges.staff && (
                      <ProfileBadge
                        icon={ShieldUser}
                        label="Staff"
                        colorClass="text-badges-staff"
                      />
                    )}
                    {badges.test && (
                      <ProfileBadge
                        icon={FlaskConical}
                        label="Tester"
                        colorClass="text-badges-test"
                      />
                    )}
                    {badges.banned && (
                      <ProfileBadge
                        icon={Ban}
                        label="Banned"
                        colorClass="text-badges-ban"
                      />
                    )}
                    {badges.pc && (
                      <ProfileBadge
                        icon={Monitor}
                        label="PC Player"
                        colorClass="text-white"
                      />
                    )}
                    {badges.mobile && (
                      <ProfileBadge
                        icon={TabletSmartphone}
                        label="Mobile Player"
                        colorClass="text-white"
                      />
                    )}
                  </span>
                )}
                {isOwnProfile && (
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-1 bg-main-bg/50 hover:bg-white/10 rounded transition-colors"
                    title="Profile Settings"
                  >
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>
              {specialAbout && 
                <span className="relative group text-xs text-white/70 break-keep italic">
                  {specialAbout}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[99999] not-italic">
                    Special about
                  </span>
                </span>
                }
              {about && 
                <span className="relative group text-sm text-white/80 break-keep">
                  {renderAbout(about, !!badges?.staff)}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[99999]">
                    About
                  </span>
                </span>
              }

              <hr className="border-white/20 border-1 w-full max-w-sm m-2"/>

              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-x-12 w-full justify-center">
                <div className="flex flex-col">
                  <span className="text-sm text-white/80">Place</span>
                  <span className="text-base">{place ? place : "-"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-white/80">Name</span>
                  <span className="text-base">{name ? name : "-"}</span>
                </div>

                <div className="flex flex-col col-span-2 sm:col-auto">
                  <span className="text-sm text-white/80">Hardest</span>
                  <span className="text-base">{hardest ? hardest : "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-main-darklight p-4 sm:p-6 rounded-lg mx-auto max-w-[500px] w-full">
            <span className="text-lg sm:text-xl">Records</span>
                        
            <div className="w-full mt-4 overflow-x-auto">
              {isTabletView ? (
                <div className="space-y-3">
                  {records && records.length > 0 ? (
                    records.map((record, index) => (
                      record.level !== undefined && (
                        <div key={index} className="bg-main-bg/30 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <a 
                              href={`/level/${record.levelId}`}
                              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-sm font-medium"
                            >
                              {record.level}
                            </a>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded">
                              {record.status}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-xs text-white/70 mb-1">Progress</div>
                            <ProgressBar progress={record.progress} />
                          </div>
                          
                          {record.video && (
                            <a 
                              href={record.video} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 bg-blue-400 hover:bg-blue-500 transition-colors rounded-lg py-1 px-3 text-sm"
                            >
                              <Triangle className="rotate-90 w-3 h-3"/>
                              Video
                            </a>
                          )}
                        </div>
                      )
                    ))
                  ) : (
                    <div className="p-4 text-center text-white/60">
                      No records found
                    </div>
                  )}
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="p-2 font-medium text-sm sm:text-base">Level</th>
                      <th className="p-2 font-medium text-sm sm:text-base">Progress</th>
                      <th className="p-2 font-medium text-sm sm:text-base">Status</th>
                      <th className="p-2 font-medium text-sm sm:text-base">Video</th>
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
                                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-sm sm:text-base"
                                >
                                  {record.level}
                                </a>
                              </td>
                              <td className="p-2 w-32">
                                <ProgressBar progress={record.progress} />
                              </td>
                              <td className="p-2 text-sm sm:text-base">{record.status}</td>
                              <td className="flex justify-center items-center p-2">
                                {record.video && (
                                  <a 
                                    href={record.video} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex justify-center bg-blue-400 hover:bg-blue-500 transition-colors rounded-lg w-16 py-1"
                                  >
                                    <Triangle className="rotate-90 m-0.5"/>
                                  </a>
                                )}
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
              )}
            </div>
          </div>

          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            badges={badges}
            userId={userID}
            about={about}
          />
        </div>
      ) : 
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-16 w-16 sm:h-20 sm:w-20 text-main-light" />
        </div>
      }
    </div>
  );
}