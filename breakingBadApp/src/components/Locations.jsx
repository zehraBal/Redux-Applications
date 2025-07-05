import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLocationsQuery,
  useGetMultipleCharactersQuery,
  useGetMultipleEpisodesQuery,
} from "../store/services/apiSlice";
import { setLocationFilter } from "../store/slices/filtersSlice";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { LocationCard } from "./LocationCard";
import { FilterPanel } from "./FilterPanel";

export default function Locations() {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allLocations, setAllLocations] = useState([]);
  const locationFilters = useSelector((store) => store.filters.locationFilters);

  const {
    data: currentPageData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetLocationsQuery({ page, ...locationFilters });

  // Get resident IDs
  const residentIds =
    currentPageData?.results
      ?.flatMap((location) =>
        location.residents.map((url) => url.split("/").pop())
      )
      .filter(Boolean) || [];

  // Get resident details
  const { data: residents } = useGetMultipleCharactersQuery(residentIds, {
    skip: residentIds.length === 0,
  });

  // Get all episode URLs from residents
  const episodeUrls = residents
    ? Array.isArray(residents)
      ? residents.flatMap((resident) => resident.episode)
      : residents.episode
    : [];

  // Extract episode IDs
  const episodeIds = episodeUrls
    .map((url) => url.split("/").pop())
    .filter(Boolean);

  // Get episode details
  const { data: episodes } = useGetMultipleEpisodesQuery(episodeIds, {
    skip: episodeIds.length === 0,
  });

  // Enhance locations with resident and episode data
  const locationsWithDetails = currentPageData?.results?.map((location) => {
    const locationResidentIds = location.residents.map((url) =>
      url.split("/").pop()
    );

    // Filter residents for this location
    const locationResidents = Array.isArray(residents)
      ? residents.filter((resident) =>
          locationResidentIds.includes(String(resident.id))
        )
      : residents && locationResidentIds.includes(String(residents.id))
      ? [residents]
      : [];

    // Get episodes featuring these residents
    const residentEpisodeUrls = locationResidents.flatMap((res) => res.episode);
    const residentEpisodeIds = residentEpisodeUrls.map((url) =>
      url.split("/").pop()
    );

    const locationEpisodes = Array.isArray(episodes)
      ? episodes.filter((ep) => residentEpisodeIds.includes(String(ep.id)))
      : episodes && residentEpisodeIds.includes(String(episodes.id))
      ? [episodes]
      : [];

    return {
      ...location,
      residentDetails: locationResidents,
      episodeDetails: [...new Set(locationEpisodes)], // Remove duplicates
    };
  });

  useEffect(() => {
    if (locationsWithDetails) {
      if (page === 1) {
        setAllLocations(locationsWithDetails);
      } else {
        setAllLocations((prev) => [...prev, ...locationsWithDetails]);
      }
    }
  }, [locationsWithDetails, page]);

  useEffect(() => {
    setPage(1);
    setAllLocations([]);
  }, [locationFilters]);

  const handleFilterChange = (filters) => {
    dispatch(setLocationFilter(filters));
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  const hasMore = currentPageData?.info?.next !== null;

  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 min-h-screen">
      <div className="py-14">
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-200">
          LOCATIONS
        </h1>
      </div>

      <FilterPanel
        filters={locationFilters}
        onFiltersChange={handleFilterChange}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl px-4">
        {allLocations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      <div className="mt-8 mb-12">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetching ? "Loading..." : "Load More Locations"}
          </button>
        )}
        {!hasMore && allLocations.length > 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No more locations to show
          </p>
        )}
      </div>
    </div>
  );
}
