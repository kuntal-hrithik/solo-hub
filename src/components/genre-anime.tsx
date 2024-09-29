import { useQuery } from "@tanstack/react-query";

import { getTopAiring, getTrendingAnime } from "@/api-client";

function GenreAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genre-anime"],
    queryFn: () => getTopAiring(),
  });

  const {
    data: trending,
    isLoading: isLoadingTrending,
    error: errorTrending,
  } = useQuery({
    queryKey: ["trending-anime"],
    queryFn: () => getTrendingAnime(),
  });
  if (isLoadingTrending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (errorTrending) {
    return (
      <div className="flex h-screen items-center justify-center">Error</div>
    );
  }
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
    <div>
      <div className="flex p-4">
        <div className="w-1/4 text-2xl font-bold text-gray-400 dark:text-pink-300">
          Action
        </div>
        <div className="w-1/4 text-2xl font-bold text-gray-400 dark:text-pink-300">
          Trending
        </div>
        <div className="w-1/4 text-2xl font-bold text-gray-400 dark:text-pink-300">
          Most Favourite
        </div>
        <div className="w-1/4 text-2xl font-bold text-gray-400 dark:text-pink-300">
          {" "}
          Latest Completed
        </div>
      </div>
      <div className="flex gap-2 p-4">
        <div className="flex w-1/4 flex-col">
          {data?.results.slice(0, 6).map((el) => (
            <ul key={el.id}>
              <li className="mt-4 flex items-center gap-2 border-b-2 border-gray-300 pb-2 dark:bg-gray-900">
                <img
                  src={el.image}
                  alt=""
                  className="size-14 cursor-pointer rounded-md object-cover"
                />
                <div className="">
                  <div className="flex flex-wrap font-semibold">
                    {(typeof el.title === "string" ?
                      el.title
                    : el.title.userPreferred || ""
                    )
                      .split(" ")
                      .map((word, index) => (
                        <span
                          key={index}
                          className="mb-1 mr-1 inline-block cursor-pointer text-sm"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="rounded bg-gray-200 px-2 py-1">
                      {el.status}
                    </div>
                    <div className="rounded bg-yellow-200 px-2 py-1">
                      Rating: {el.rating?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex w-1/4 flex-col">
          {trending!.results?.slice(0, 6)?.map((el) => (
            <ul key={el.id}>
              <li className="mt-4 flex items-center gap-2 border-b-2 border-gray-300 pb-2 dark:bg-gray-900">
                <img
                  src={el.image}
                  alt=""
                  className="size-14 cursor-pointer rounded-md object-cover"
                />
                <div className="">
                  <div className="flex flex-wrap font-semibold">
                    {(typeof el.title === "string" ?
                      el.title
                    : el.title.userPreferred || ""
                    )
                      .split(" ")
                      .map((word: string, index: number) => (
                        <span
                          key={index}
                          className="mb-1 mr-1 inline-block cursor-pointer text-sm"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="rounded bg-gray-200 px-2 py-1">
                      {el.status}
                    </div>
                    <div className="rounded bg-yellow-200 px-2 py-1">
                      Rating: {el.rating?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex w-1/4 flex-col">
          {data?.results.slice(0, 6).map((el) => (
            <ul key={el.id}>
              <li className="mt-4 flex items-center gap-2 border-b-2 border-gray-300 pb-2 dark:bg-gray-900">
                <img
                  src={el.image}
                  alt=""
                  className="size-14 cursor-pointer rounded-md object-cover"
                />
                <div className="">
                  <div className="flex flex-wrap font-semibold">
                    {(typeof el.title === "string" ?
                      el.title
                    : el.title.userPreferred || ""
                    )
                      .split(" ")
                      .map((word, index) => (
                        <span
                          key={index}
                          className="mb-1 mr-1 inline-block cursor-pointer text-sm"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="rounded bg-gray-200 px-2 py-1">
                      {el.status}
                    </div>
                    <div className="rounded bg-yellow-200 px-2 py-1">
                      Rating: {el.rating?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex w-1/4 flex-col">
          {data?.results.slice(0, 6).map((el) => (
            <ul key={el.id}>
              <li className="mt-4 flex items-center gap-2 border-b-2 border-gray-300 pb-2 dark:bg-gray-900">
                <img
                  src={el.image}
                  alt=""
                  className="size-14 cursor-pointer rounded-md object-cover"
                />
                <div className="">
                  <div className="flex flex-wrap font-semibold">
                    {(typeof el.title === "string" ?
                      el.title
                    : el.title.userPreferred || ""
                    )
                      .split(" ")
                      .map((word, index) => (
                        <span
                          key={index}
                          className="mb-1 mr-1 inline-block cursor-pointer text-sm"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="rounded bg-gray-200 px-2 py-1">
                      {el.status}
                    </div>
                    <div className="rounded bg-yellow-200 px-2 py-1">
                      Rating: {el.rating?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="flex pl-4">
        <div className="w-1/4 cursor-pointer text-xl">View More...</div>
        <div className="w-1/4 cursor-pointer text-xl">View More...</div>
        <div className="w-1/4 cursor-pointer text-xl">View More...</div>
        <div className="w-1/4 cursor-pointer text-xl">View More...</div>
      </div>
    </div>
  );
}

export default GenreAnime;
