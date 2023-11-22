import { AxiosStatic } from "axios";
import { Club } from "./club";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";

global.atob = decode;

export interface User {
  id?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  licenceNumber?: string;
  officialPoints?: number;
  birthdate?: string;
  club?: Club;
  sexe?: string;
  accountHolder?: string;
  iban?: string;
  bic?: string;
}

export const fetchUser = async (axios: AxiosStatic) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;
  const tokenDecoded = jwtDecode<User>(token);

  const response = await axios.get(`/users/${tokenDecoded.id}`, {
    withCredentials: true,
  });
  return response.data;
};
