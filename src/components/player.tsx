import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import Artplayer from "artplayer";
import Hls from "hls.js";

import { getEpisodeSources } from "@/api-client";

import { useAppContext } from "./context-api/context";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function Player() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams({ from: "/player/$id" });
  const { episodeList } = useAppContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sources", id], // Make sure query key is unique to `id`
    queryFn: () => getEpisodeSources(id as string),
  });

  console.log({ episodeList });
  // function handleEpisodeClick(data.sources) {
  //   console.log("Episode clicked", episode);
  // }

  console.log(data?.sources[3].url);
  useEffect(() => {
    if (ref.current && data?.sources && data.sources.length > 0) {
      const videoUrl = data.sources[3]?.url ?? "";

      console.log("Video URL:", videoUrl);

      if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
        const hls = new Hls();
        hls.loadSource(videoUrl);

        // Create a video element
        const videoElement = document.createElement("video");
        hls.attachMedia(videoElement);

        const art = new Artplayer({
          container: ref.current,
          url: videoUrl,
          customType: {
            m3u8: function (video: HTMLVideoElement, url: string) {
              hls.loadSource(url);
              hls.attachMedia(video);
            },
          },
          setting: true,
          volume: 0.5,
          isLive: false,
          muted: false,
          autoSize: true,
          autoMini: true,
          loop: false,
          flip: true,
          playbackRate: true,
          aspectRatio: true,
          fullscreen: true,
          fullscreenWeb: true,
          pip: true,
          mutex: true,
          backdrop: true,
          theme: "#23ade5",
          lang: navigator.language.toLowerCase(),
          moreVideoAttr: {
            crossOrigin: "anonymous",
          },
          settings: [
            {
              html: "Quality",
              selector: [
                {
                  html: "Auto",
                  default: true,
                },
                {
                  html: "1080p",
                },
                {
                  html: "720p",
                },
                {
                  html: "480p",
                },
              ],
              onSelect: function (item) {
                console.log("Quality:", item);
              },
            },
          ],
          controls: [
            {
              name: "fast-rewind",
              position: "right",
              html: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></svg>',
              click: function () {
                art.currentTime -= 10;
              },
            },
            {
              name: "fast-forward",
              position: "right",
              html: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z"></path></svg>',
              click: function () {
                art.forward = 10;
              },
            },
          ],
        });

        return () => {
          if (art && art.destroy) {
            art.destroy(false);
          }
          hls.destroy(); // Destroy hls.js instance on unmount
        };
      } else if (videoUrl) {
        const art = new Artplayer({
          url: videoUrl,
          container: ref.current,
        });

        return () => {
          if (art && art.destroy) {
            art.destroy(false);
          }
        };
      } else {
        console.error("No valid video URL available");
      }
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">Error</div>
    );
  }

  // No data available
  if (!data || data?.sources?.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        No data available
      </div>
    );
  }

  function handleEpisodeClick(episodeId: string) {
    navigate({ to: `/player/${episodeId}` });
  }

  // Render the player container
  return (
    <div className="flex h-screen w-full">
      <div className="h-full w-1/5 overflow-y-auto p-10">
        <h2 className="p-4 text-lg font-bold">Episodes</h2>
        <ScrollArea className="h-[85%]">
          <ul>
            {episodeList &&
              episodeList.map((episode) => (
                <li
                  key={episode.id}
                  onClick={() => {
                    handleEpisodeClick(episode.id);
                  }}
                  className="cursor-pointer rounded-lg border-b border-gray-200 p-4 text-black hover:bg-gray-200 hover:text-black"
                >
                  <div className="flex items-center">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="mr-3 size-16 object-cover"
                    />
                    <div>
                      <p className="font-semibold dark:text-white">
                        Episode {episode.number}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {episode.title}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="relative mt-4 h-[90%] w-4/5">
        <div className="absolute inset-16 bg-black" ref={ref}>
          .
        </div>
      </div>
    </div>
  );
}
