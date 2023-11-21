import { AxiosStatic } from "axios";

export interface Tournament {
  city: string;
  zipCode: string;
  beginDate: string;
  endDate: string;
  gym: string;
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
  const response = await axios.get("/tournaments", { withCredentials: true });
  return response.data;
};
