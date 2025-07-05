import { useSelector, useDispatch } from "react-redux";
import { useGetCharactersQuery } from "../store/services/apiSlice";
import { setCharacterFilter } from "../store/slices/filtersSlice";
import { FilterPanel } from "./FilterPanel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function Characters() {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState([]);

  const characterFilters = useSelector(
    (store) => store.filters.characterFilters
  );

  const {
    data: currentPageData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetCharactersQuery({
    page,
    ...characterFilters,
  });

  useEffect(() => {
    if (currentPageData?.results) {
      setAllCharacters((prev) => [...prev, ...currentPageData.results]);
    }
  }, [currentPageData]);

  useEffect(() => {
    setPage(1);
    setAllCharacters([]);
  }, [characterFilters]);

  const handleFilterChange = (filters) => {
    dispatch(setCharacterFilter(filters));
  };

  if (isLoading && page === 1) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="w-svw flex flex-col bg-slate-100 items-center justify-center dark:bg-slate-900">
      <div className="py-14">
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-200">
          CHARACTERS
        </h1>
      </div>

      {/*Filter Panel */}

      <FilterPanel
        filters={characterFilters}
        onFiltersChange={handleFilterChange}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/*Character Card */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {allCharacters.map((char) => (
          <Link
            key={char.id}
            to={`/details/${char.id}`}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight text-center line-clamp-2">
                {char.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}

      <div className="mt-4">
        {currentPageData?.info?.next ? (
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching}
            className={`px-4 py-2 rounded-lg ${
              isFetching
                ? "bg-gray-300 dark:bg-gray-600"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isFetching ? "Loading..." : "View More"}
          </button>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No more characters to show
          </p>
        )}
      </div>
    </div>
  );
}
