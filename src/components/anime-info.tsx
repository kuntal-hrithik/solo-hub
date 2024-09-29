import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

import { getAnimeInfo } from "@/api-client";

import { useAppContext } from "./context-api/context";
// import { getAnimeInfo, getTrendingAnime } from "@/api-client";

import Social from "./social-section";
import { Button } from "./ui/button";
import { Card, CardFooter } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function AnimeInfo() {
  const { id } = useParams({ from: "/anime-details/$id" });
  const { data, isLoading, error } = useQuery({
    queryKey: ["anime-info", id],
    queryFn: () => getAnimeInfo(id),
  });
  // const { data: trending } = useQuery({
  //   queryKey: ["trending"],
  //   queryFn: () => getTrendingAnime(),
  //   refetchInterval: 0, // Disable automatic refetching
  //   refetchOnMount: true, // Fetch on component mount
  //   refetchOnWindowFocus: true, // Fetch when window regains focus
  //   refetchOnReconnect: true, // Fetch on network reconnection
  // });

  const { setEpisodeList } = useAppContext();

  useEffect(() => {
    if (data?.episodes) {
      setEpisodeList(data.episodes);
    }
    console.log(data?.episodes);
  }, [data?.episodes, setEpisodeList]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log(data?.episodes);

  return (
    <div className="">
      {error ?
        <div>Error</div>
      : <div className="relative h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-md bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${data?.cover})`,
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-black/50 sm:bg-black/40 md:bg-black/30 lg:bg-black/20" />
          <div className="relative z-10 flex h-full p-4">
            <div className="w-1/4 p-8 text-2xl font-bold text-white">
              <img src={data?.image} className="h-80 w-64 rounded-lg" alt="" />
            </div>
            <div className="w-2/4 gap-4 text-2xl font-bold text-white">
              <div className="mt-8 flex items-center">
                Home
                <span className="ml-1 mt-1 inline-block size-2 items-center rounded-full bg-gray-500" />
                {data?.type}
                <span className="ml-1 mt-1 inline-block size-2 items-center rounded-full bg-gray-500" />
                <span className="text-xl">
                  {typeof data?.title === "string" ?
                    data.title
                  : data?.title?.english ||
                    data?.title?.romaji ||
                    data?.title?.native
                  }
                </span>
              </div>
              <div className="mt-10">
                <span className="text-5xl">
                  {typeof data?.title === "string" ?
                    data.title
                  : data?.title?.english ||
                    data?.title?.romaji ||
                    data?.title?.native
                  }
                </span>
              </div>

              <div className="mt-8 flex gap-2">
                <div className="inline-block rounded-l-md bg-white text-black">
                  {data?.isAdult ? "PG-18" : "PG-13"}
                </div>
                <div className="inline-block bg-pink-300 text-black">HD</div>
                <div className="inline-block bg-green-200 text-black">
                  {data?.totalEpisodes}
                </div>
              </div>
              <div className="mt-6">
                {data?.episodes && data.episodes.length > 0 && (
                  <Link to={`/player/${data.episodes[0].id}`}>
                    <Button variant="default">Watch Now</Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="text-black dark:text-white"
                >
                  Trailer
                </Button>
              </div>
              <div className="mt-8 line-clamp-5 font-serif text-xl">
                {data?.description}
              </div>
              <div>
                <Social />
              </div>
            </div>

            {/* <div className="w-1/4">hello</div> */}
          </div>
        </div>
      }
      <h1 className="mt-10 text-2xl font-bold text-gray-500">Episodes</h1>
      <ScrollArea className="">
        <ScrollArea>
          <div className="flex gap-4 overflow-x-auto">
            {data?.episodes?.map((el) => (
              <Card key={el.id} className="cursor-pointer">
                <div className="h-56 w-40 overflow-hidden">
                  <img
                    src={el.image}
                    alt={el.title}
                    className="size-full object-cover"
                  />
                </div>
                <CardFooter className="">
                  <p
                    className="truncate pt-2 text-sm font-bold"
                    style={{ maxWidth: "100px" }}
                  >
                    {typeof el.title === "string" ?
                      el.title
                    : (el.title &&
                        ("english" in el.title ? el.title
                        : "romaji" in el.title ? el.title
                        : "")) ||
                      ""
                    }
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* <h3 className="p-4 text-2xl font-bold text-gray-500">
        Recommended For you
      </h3>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 p-4">
        {trending?.results.map((el) => (
          <Card key={el.id} className="w-full cursor-pointer">
            <div className="aspect-[2/3] overflow-hidden">
              <img
                src={el.image}
                className="h-full w-full object-cover"
                alt={
                  typeof el.title === "string" ?
                    el.title
                  : el.title.english || el.title.romaji || ""
                }
              />
            </div>
            <CardFooter className="flex">
              <p className="w-full truncate text-sm font-bold">
                {typeof el.title === "string" ?
                  el.title
                : el.title.english || el.title.romaji || ""}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
