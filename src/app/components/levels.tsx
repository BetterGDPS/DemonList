"use client"

import axios from 'axios';

export type Demon = {
  _id: number;
  name: string;
  place?: number;
  lenght: string;
  obj: number;
  author: string;
  song: number;
  verifed: string;
  release: string;
  url: string;
  unlisted?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getYoutubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export const getLevels = async (type: string = 'main'): Promise<Demon[]> => {
  if (type === 'main') {
    const { data } = await axios.get<{ data: Demon[] }>(`${API_URL}/level/main`);
    return data.data.map((demon: Demon) => ({
      ...demon,
      url: getYoutubeId(demon.url) || '/empty.png'
    })).sort((a: Demon, b: Demon) => (a.place || 0) - (b.place || 0));
  }
  // Для других типов возвращаем пустой массив (заглушка)
  return [];
};

export const getLevelById = async (id: number): Promise<Demon> => {
  try {
    const { data } = await axios.get<{ data: Demon }>(`${API_URL}/level/get/${id}`);
    if (!data.data) {
      throw new Error('No data received from server');
    }
    return {
      ...data.data,
      url: getYoutubeId(data.data.url) || '/empty.png'
    };
  } catch (error) {
    console.error(`Error fetching level ${id}:`, error);
    throw error;
  }
};