interface Episode {
  id: string;
  title: string;
  description: string | null;
  number: number;
  image: string;
  airDate: string | null;
  imageHash: string;
}

export type Episodes = Episode[];
