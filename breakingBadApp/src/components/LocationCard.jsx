import { Globe, Users, MapPin, Tv } from "lucide-react";

export const LocationCard = ({ location }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg flex flex-col h-full">
      {/* Üst Kısım - Lokasyon Bilgileri */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
              {location.name}
            </h3>
            <div className="inline-block bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
              {location.type}
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {location.dimension || "Unknown dimension"}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {location.residents.length}{" "}
              {location.residents.length === 1 ? "resident" : "residents"}
            </span>
          </div>
        </div>

        {/* Residents Section */}
        {location.residentDetails?.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Notable Residents</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {location.residentDetails.slice(0, 4).map((resident) => (
                <div
                  key={resident.id}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                  title={resident.name}
                >
                  <img
                    src={resident.image}
                    alt={resident.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                    {resident.name.split(" ")[0]}
                  </span>
                </div>
              ))}
              {location.residentDetails.length > 4 && (
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 min-w-[40px]">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{location.residentDetails.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Episodes Section */}
        {location.episodeDetails?.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
              <Tv className="w-4 h-4" />
              <span>Featured Episodes</span>
            </h4>
            <div className="space-y-2">
              {location.episodeDetails.slice(0, 3).map((episode) => (
                <div
                  key={episode.id}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                  title={episode.name}
                >
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                    {episode.name.length > 15
                      ? `${episode.name.substring(0, 15)}...`
                      : episode.name}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-mono">
                    {episode.episode}
                  </span>
                </div>
              ))}
              {location.episodeDetails.length > 3 && (
                <div className="text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{location.episodeDetails.length - 3} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sabit Alt Kısım - Location ID */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Location ID:
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            #{location.id}
          </span>
        </div>
      </div>
    </div>
  );
};
