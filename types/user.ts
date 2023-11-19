import { Club } from "./club";

export interface User {
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
