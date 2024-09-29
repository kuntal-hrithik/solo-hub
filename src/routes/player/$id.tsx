import { createFileRoute } from "@tanstack/react-router";

import Player from "@/components/player";

export const Route = createFileRoute("/player/$id")({
  component: () => <Player />,
});
