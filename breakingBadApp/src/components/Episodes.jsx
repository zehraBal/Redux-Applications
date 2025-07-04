import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetEpisodesQuery } from "../store/services/apiSlice"; // API'den episode verilerini almak için
import { setEpisodeFilter } from "../store/slices/filtersSlice"; // Episode filtrelerini ayarlamak için
import { EpisodeCard } from "./EpisodeCard"; // EpisodeCard bileşenini içe aktar
import { FilterPanel } from "./FilterPanel"; // FilterPanel bileşenini içe aktar

export default function Episodes() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Sayfa numarasını yönetmek için state
  const [episodesToShow, setEpisodesToShow] = useState(4); // Başlangıçta gösterilecek episode sayısı
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filtre panelinin açık olup olmadığını yönetmek için state
  const episodeFilters = useSelector((store) => store.filters.episodeFilters); // Episode filtrelerini al

  const {
    data: episodes,
    isLoading,
    isError,
  } = useGetEpisodesQuery({
    page: currentPage,
    ...episodeFilters,
  }); // API'den episode verilerini al

  const handleFilterChange = (filters) => {
    dispatch(setEpisodeFilter(filters)); // Filtreleri güncelle
  };

  const handleViewMore = () => {
    setEpisodesToShow((prev) => prev + 4); // Daha fazla episode göster
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading episodes</div>;

  return (
    <div className="w-svw flex flex-col bg-slate-100 items-center justify-center dark:bg-slate-900">
      <div className="py-14">
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-200">
          EPISODES
        </h1>
      </div>

      {/* Filtre Paneli */}
      <FilterPanel
        filters={episodeFilters}
        onFiltersChange={handleFilterChange}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Episode Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {episodes.results.slice(0, episodesToShow).map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>

      {/* View More Butonu */}
      {episodesToShow < episodes.results.length && (
        <button
          onClick={handleViewMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          View More
        </button>
      )}
    </div>
  );
}
