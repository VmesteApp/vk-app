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
}
