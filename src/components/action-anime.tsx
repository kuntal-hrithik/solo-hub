import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { getAnimeByGenre } from "@/api-client";

import { Card, CardFooter } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function ActionAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["action-anime"],
    queryFn: () => getAnimeByGenre(["Action"]),
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
    <ScrollArea>
      <div className="flex gap-4 overflow-x-auto">
        {data?.results.map((el) => (
          <Link to={`/anime-details/${el.id}`}>
            <Card key={el.id} className="cursor-pointer">
              <div className="h-56 w-40 overflow-hidden">
                <img src={el.image} className="size-full object-cover" />
              </div>
              <CardFooter>
                <p
                  className="truncate pt-2 text-sm font-bold"
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

export default ActionAnime;
