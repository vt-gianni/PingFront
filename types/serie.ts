import { Tournament } from "./tournament";

export interface Serie {
  id?: string;
  tournament: Tournament;
  beginDateTime: string;
  isHandicap: boolean;
  isOpen: boolean;
  minAge: number;
  maxAge: number;
  minPoints: number;
  maxPoints: number;
  onlyMen: boolean;
  onlyWomen: boolean;
  minPlaces: number;
  maxPlaces: number;
  price: number;
}
