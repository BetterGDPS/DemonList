import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export const userApi = {
  addUser: async (userData: {
    id?: string;
    username?: string;
    email?: string;
    avatar?: string;
  }) => {
    const response = await api.post('/account/add', userData);
    return response;
  },

  updateUser: async (userId?: string, username?: string, avatar?: string, email?: string) => {
    const response = await api.put(`/account/update/${userId}`, {
      username: username,
      email: email,
      avatar: avatar
    });
    return response;
  },
};