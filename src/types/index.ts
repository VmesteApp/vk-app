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
}

export interface IApplication {
  message: string;
  status: string;
  pulse: IPulse;
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