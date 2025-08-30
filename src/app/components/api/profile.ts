import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface RecordType {
  levelId: string;
  level: string;
  progress: number;
  status: string;
  video: string;
}

export interface BadgesType {
  pc: boolean;
  mobile: boolean;
  dev: boolean;
  owner: boolean;
  staff: boolean;
  banned: boolean;
  test: boolean;
}

export interface UserProfileData {
  username: string;
  name: string | null;
  _id: string;
  hardest: string | null;
  place: number | null;
  about: string | null; 
  records: Record<string, Omit<RecordType, 'levelId'>> | null;
  badges: Omit<BadgesType, 'banned'>;
}

export const profileApi = {
  getUserProfile: async (username: string): Promise<UserProfileData> => {
    const response = await api.get(`/account/get/${username}`);
    return response.data;
  },

  updateBadge: async (userId: string, badgeName: string, badgeValue: boolean) => {
    const response = await api.put(`/account/update_badge/${userId}`, {
      badge_name: badgeName,
      badge_value: badgeValue
    });
    return response.data;
  },

  updateAbout: async (userId: string, aboutText: string) => {
    const response = await api.put(`/account/update/${userId}`, {
      about: aboutText
    });
    return response.data;
  },
};