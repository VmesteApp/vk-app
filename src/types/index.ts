export interface ITag {
  id: number;
  name: string;
}

export interface IPulse {
  id: number;
  category: string;
  name: string;
  founder_id: number;
  description: string;
  short_description: string;
  images: string[];
  tags: ITag[];
  blocked: boolean;
}

export interface IApplication {
  message: string;
  status: string;
  pulse: IPulse;
}

export interface IApplicationWithCandidate {
  pulse_id: number;
  id: number;
  candidate_id: number;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface IPulsePreview {
  id: number;
  category: string;
  name: string;
  founder_id: number;
  description: string;
  short_description: string;
  members: number[];
  images: string[];
  tags: ITag[];
}
