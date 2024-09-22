import { createFileRoute } from "@tanstack/react-router";

import AnimeInfo from "@/components/anime-info";

export const Route = createFileRoute("/anime-details/$id")({
  component: () => <AnimeInfo />,
});
