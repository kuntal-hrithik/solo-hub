import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getPopularAnime } from "../api-client";
import { Button } from "./ui/button";

const Popular: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-anime"],
    queryFn: getPopularAnime,
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
    <Carousel className="relative">
      <CarouselContent className="flex">
        {data?.results.map((el) => (
          <CarouselItem key={el.id} className="relative h-[420px]">
            <img
              src={el.cover}
              className="absolute inset-0 size-full object-cover"
              alt=""
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                filter: "blur(5px)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-r from-background to-transparent p-4">
              <div className="flex h-full w-2/3 flex-col items-start justify-center p-4">
                <h2 className="mb-2 text-3xl font-bold text-gray-400">
                  {typeof el.title === "string" ?
                    el.title
                  : el.title.userPreferred}
                </h2>
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                  {el.description?.replace(/<[^>]*>/g, "")}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Link to={`/anime-details/${el.id}`}>
                    <Button variant="default" className="bg-pink-300">
                      Watch Now
                    </Button>
                  </Link>

                  <Button variant="outline">Trailer</Button>
                </div>
              </div>

              <div className="absolute right-4">
                <img
                  src={el.image}
                  alt={
                    typeof el.title === "string" ?
                      el.title
                    : el.title.userPreferred
                  }
                  className="h-full w-64 rounded-md object-cover shadow-lg"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default Popular;
