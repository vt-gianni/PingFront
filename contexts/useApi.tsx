import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useApi = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(null);

  const loadToken = useCallback(async () => {
    const savedToken = await AsyncStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post('/refresh-token', { token: await AsyncStorage.getItem('refreshToken') });
      const newToken = response.data.token;
      setToken(newToken);
      await AsyncStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }, []);

  const requestInterceptor = useCallback(async (config) => {
    if (config.withCredentials !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, [token]);

  const responseInterceptor = useCallback(async (error) => {
    if (error.response && error.response.status === 401 && error.config.withCredentials) {
      await refreshToken();
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }, [refreshToken]);

  const login = useMutation(
    async ({ username, password }: { username: string, password: string }) => {
      try {
        const response = await axios.post(apiUrl + '/login', { username, password }, { withCredentials: false });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          // Rejetez l'erreur avec le message retourné par l'API
          throw new Error(error.response.data.message || 'Erreur de connexion');
        } else {
          // Si l'erreur n'a pas de réponse ou de données, rejetez une erreur générale
          throw new Error('Erreur de connexion');
        }
      }
    },
    {
      onSuccess: (data) => {
        setToken(data.token);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('refreshToken', data.refresh_token);
        router.replace('home');
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    }
  );

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(undefined, responseInterceptor);

  const query = useQuery;
  const mutate = useMutation;

  return { query, login };
};

export default useApi;
