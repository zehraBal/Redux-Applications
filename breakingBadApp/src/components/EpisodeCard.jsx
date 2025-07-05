import { Calendar, Users } from "lucide-react";

export const EpisodeCard = ({ episode }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
            {episode.name}
          </h3>
          <div className="inline-block bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
            {episode.episode}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">
            {episode.air_date}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">
            {episode.characters.length} characters
          </span>
        </div>
      </div>

      {/* Characters */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Featured Characters
        </h4>
        <div className="flex flex-wrap gap-2">
          {episode.characterDetails?.slice(0, 5).map((character) => (
            <div
              key={character.id}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
              title={character.name}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {character.name.split(" ")[0]}
              </span>
            </div>
          ))}
          {episode.characterDetails?.length > 5 && (
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 min-w-[40px]">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{episode.characterDetails.length - 5}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Episode ID:
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            #{episode.id}
          </span>
        </div>
      </div>
    </div>
  );
};
