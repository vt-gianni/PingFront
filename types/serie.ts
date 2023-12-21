import { AxiosStatic } from "axios";
import { Tournament } from "./tournament";
import { User } from "./user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Serie {
  id?: string;
  tournament: Tournament;
  beginDateTime: string;
  isHandicap: boolean;
  isOpen: boolean;
  minAge?: number;
  maxAge?: number;
  minPoints?: number;
  maxPoints?: number;
  onlyMen: boolean;
  onlyWomen: boolean;
  minPlaces: number;
  maxPlaces: number;
  price: number;
  usersRegistered: User[]
}

export function serieTitle(serie: Serie) {

  if (serie.onlyMen) return "Série Hommes"
  if (serie.onlyWomen) return "Série Femmes"
  if (serie.minPoints && !serie.maxPoints) `Série +${serie.minPoints}`
  if (!serie.minPoints && serie.maxPoints) return `Série -${serie.maxPoints}`
  if (serie.minPoints && serie.maxPoints) return `Série ${serie.minPoints} à ${serie.maxPoints} points`

  return `Série`
}

export async function fetchSerie(axios: AxiosStatic, id: string) {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get(`/series/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export async function registerUserToSerie(axios: AxiosStatic, serie: Serie, user: User) {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  if (!serie) return null;
  if (!user) return null;

  const response = await axios.post(`/series/${serie.id}/register/${user.id}`, {}, { withCredentials: true });
  return response.data;
}