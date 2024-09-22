import { ANIME, META } from "@consumet/extensions";

import type { Trending } from "./types/trending";

export async function getPopularAnime() {
  const anime = new META.Anilist();
  return await anime.fetchPopularAnime();
}

export async function getTrendingAnime() {
  const anime = new META.Anilist();
  return <Trending>(<unknown>await anime.fetchTrendingAnime());
}

export async function getAnimeInfo(id: string) {
  const anime = new META.Anilist();
  return await anime.fetchAnimeInfo(id);
}

export async function getAnimeByGenre(genres: string[]) {
  const anime = new META.Anilist();
  return await anime.fetchAnimeGenres(genres);
}

export async function getEpisodeSources(id: string) {
  const anime = new META.Anilist();
  return await anime.fetchEpisodeSources(id);
}
export async function getTopAiring() {
  const anime = new ANIME.Gogoanime();
  return await anime.fetchTopAiring();
}

export async function getSearchResults(search: string) {
  const anime = new ANIME.Gogoanime();
  return await anime.search(search);
}

export async function getMostFavourite() {
  const zoro = new ANIME.Zoro();
  return await zoro.fetchMostFavorite();
}
