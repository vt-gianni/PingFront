import { AxiosStatic } from "axios";
import { Club } from "./club";

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
  const response = await axios.get("/users/1", { withCredentials: true });
  return response.data;
};
