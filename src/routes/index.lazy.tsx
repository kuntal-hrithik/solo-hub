import { createLazyFileRoute } from "@tanstack/react-router";

import ActionAnime from "@/components/action-anime";
import GenreAnime from "@/components/genre-anime";
import HaremAnime from "@/components/harem-anime";
import Popular from "@/components/popular-anime";
import RomanceAnime from "@/components/romance-anime";
import Social from "@/components/social-section";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  return (
    <div>
      <Popular />
      <h1 className="text-2xl font-bold text-slate-500">Action Anime</h1>
      <ActionAnime />
      <Social />
      <RomanceAnime />
      <GenreAnime />
      <HaremAnime />
    </div>
  );
}
