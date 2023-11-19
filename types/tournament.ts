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
