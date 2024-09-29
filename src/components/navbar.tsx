import { useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Moon, Search, Sun } from "lucide-react";

import { getSearchResults } from "@/api-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "./ui/button";

function Navbar() {
  // Debounce mechanism
  const searchRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-anime", searchRef.current?.value],
    queryFn: () => getSearchResults(searchRef.current!.value),
    enabled: !!searchRef.current?.value,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">Error</div>
    );
  }
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full border-b bg-background text-black">
      <Link to="/" className="flex items-center gap-x-2">
        <p className="font-bold dark:text-white sm:text-sm lg:text-2xl">
          SOLO<span className="text-black dark:text-white">-HUb</span>
        </p>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Dialog>
          <DialogTrigger>
            <Button
              size="sm"
              variant="outline"
              className="w-48 justify-start border-black bg-background text-muted-foreground"
            >
              <Search size={16} className="mr-2" />
              ...Search Anime
            </Button>
          </DialogTrigger>
          <DialogContent className="h-64 w-full overflow-hidden">
            <DialogHeader>
              <Input
                ref={searchRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    refetch();
                  }
                }}
                placeholder="Search anime..."
              />
            </DialogHeader>
            <ScrollArea>
              <div className="flex flex-col">
                {data?.results.map((anime) => (
                  <div className="flex flex-row gap-2 rounded border">
                    <img className="size-14" src={anime.image} alt="" />
                    <h1 className="flex items-center justify-center font-bold">
                      {typeof anime.title === "string" ?
                        anime.title
                      : anime.title.userPreferred}
                    </h1>
                  </div>
                ))}
                ;
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Button>Logout</Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
          >
            {document.documentElement.classList.contains("dark") ?
              <Sun size={20} className="text-black dark:text-white" />
            : <Moon size={20} />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
