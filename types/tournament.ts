import { AxiosStatic } from "axios";
import { Serie } from "./serie";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Tournament {
  id?: string;
  city: string;
  zipCode: string;
  beginDate: string;
  endDate: string;
  gym: string;
  address: string;
  series: Serie[];
}

export interface TournamentResponse {
  upcoming: {
    "hydra:totalItems": number;
    "hydra:member": Tournament[];
  };
  past: {
    "hydra:totalItems": number;
    "hydra:member": Tournament[];
  };
}

export const fetchTournaments = async (axios: AxiosStatic) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get("/tournaments", { withCredentials: true });
  return response.data;
};

export const fetchTournament = async (axios: AxiosStatic, id: string) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get(`/tournaments/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
