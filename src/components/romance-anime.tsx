import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { getAnimeByGenre } from "@/api-client";

import AnimeInfo from "./anime-info";
import { Card, CardFooter } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function RomanceAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["action-anime"],
    queryFn: () => getAnimeByGenre(["Romance"]),
  });
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">Error</div>
    );
  }
  return (
    <ScrollArea className="mt-10 h-80">
      <div className="flex gap-4 pb-4">
        {data?.results.map((el) => (
          <Link to={`/anime-details/${el.id}`}>
            <Card
              key={el.id}
              className="cursor-pointer transition-transform hover:translate-x-1 hover:translate-y-1 hover:-rotate-3 hover:scale-105"
            >
              <div className="h-56 w-40 overflow-hidden">
                <img
                  src={el.image}
                  className="size-full object-cover"
                  alt={
                    typeof el.title === "string" ?
                      el.title
                    : el.title.english || el.title.romaji || ""
                  }
                />
              </div>
              <CardFooter className="h-14 overflow-hidden">
                <p
                  className="truncate text-sm font-bold"
                  style={{ maxWidth: "100px" }}
                >
                  {typeof el.title === "string" ?
                    el.title
                  : el.title.english || el.title.romaji || ""}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default RomanceAnime;
