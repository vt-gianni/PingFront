import { AxiosStatic } from "axios";

export interface Club {
  name: string;
  city: string;
  zipCode: string;
  address: string;
  addressMore?: string;
  number: string;
  gym: string;
  mailAddress: string;
  phone: string;
}

export interface ClubResponse {
  "hydra:totalItems": number;
  "hydra:member": Club[];
}

export const fetchClubs = async (axios: AxiosStatic) => {
  const response = await axios.get("/clubs", { withCredentials: true });
  return response.data;
};
