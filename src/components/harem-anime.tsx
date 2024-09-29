import { useQuery } from "@tanstack/react-query";

import { getAnimeByGenre } from "@/api-client";

import { Card, CardFooter } from "./ui/card";

export default function HaremAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adventure-anime"],
    queryFn: () => getAnimeByGenre(["Adventure"]),
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
    <>
      <h1 className="mt-16 p-4 text-2xl font-bold dark:text-pink-300">
        Recommended For you
      </h1>
      <div className="grid grid-cols-8 grid-rows-4 gap-4 p-4">
        {data?.results.map((el) => (
          <Card key={el.id} className="w-full cursor-pointer">
            <div className="aspect-[2/3] overflow-hidden">
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
            <CardFooter>
              <h1 className="truncate p-2 font-semibold">
                {typeof el.title === "string" ?
                  el.title
                : el.title.english || el.title.romaji || ""}
              </h1>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
