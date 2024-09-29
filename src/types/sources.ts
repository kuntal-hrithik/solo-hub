export interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}

// Define the main type for the data
export interface VideoData {
  headers: {
    Referer: string;
  };
  sources: Source[];
  download: string;
}
