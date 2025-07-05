import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetEpisodesQuery,
  useGetMultipleCharactersQuery,
} from "../store/services/apiSlice";
import { setEpisodeFilter } from "../store/slices/filtersSlice";
import { EpisodeCard } from "./EpisodeCard";
import { FilterPanel } from "./FilterPanel";

export default function Episodes() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesToShow, setEpisodesToShow] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const episodeFilters = useSelector((store) => store.filters.episodeFilters);

  const {
    data: episodes,
    isLoading,
    isError,
  } = useGetEpisodesQuery({
    page: currentPage,
    ...episodeFilters,
  });

  // Get character ids
  const characterIds =
    episodes?.results?.flatMap((episode) =>
      episode.characters.map((url) => url.split("/").pop())
    ) || [];

  // Get character details
  const { data: characters } = useGetMultipleCharactersQuery(characterIds, {
    skip: characterIds.length === 0,
  });

  // Character details part
  const episodesWithCharacters = episodes?.results?.map((episode) => {
    const episodeCharacterIds = episode.characters.map((url) =>
      url.split("/").pop()
    );
    const episodeCharacters = characters?.filter((char) =>
      episodeCharacterIds.includes(String(char.id))
    );
    return {
      ...episode,
      characterDetails: episodeCharacters || [],
    };
  });

  const handleFilterChange = (filters) => {
    dispatch(setEpisodeFilter(filters));
  };

  const handleViewMore = () => {
    setEpisodesToShow((prev) => prev + 4);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading episodes</div>;

  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 min-h-screen">
      <div className="py-14">
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-200">
          EPISODES
        </h1>
      </div>

      {/*Filter Panel  */}

      <FilterPanel
        filters={episodeFilters}
        onFiltersChange={handleFilterChange}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Episode Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl px-4">
        {episodesWithCharacters?.slice(0, episodesToShow).map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>

      {episodesToShow < episodes.results.length && (
        <button
          onClick={handleViewMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View More
        </button>
      )}
    </div>
  );
}
