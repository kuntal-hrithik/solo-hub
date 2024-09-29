import { createContext, useContext, useState } from "react";

export interface Episode {
  id: string;
  title?: string;
  description?: string | null;
  number: number;
  image?: string;
  imageHash?: string;
}

// Define Episodes as a flat array of Episode objects
export type Episodes = Episode[];

// Define the type for the context value
interface AppContextType {
  episodeList: Episodes;
  setEpisodeList: (episodeList: Episodes) => void;
}

interface AppContextType {
  episodeList: Episodes;
  setEpisodeList: (episodeList: Episodes) => void;
}

export const PlayerContext = createContext<AppContextType>({
  episodeList: [],
  setEpisodeList: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [episodeList, setEpisodeList] = useState<Episodes>([]);

  const contextValue = {
    episodeList,
    setEpisodeList,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(PlayerContext);
  return context as AppContextType;
};
