import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Heart, HelpCircle, Skull } from "lucide-react";

export default function Details() {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Alive":
        return <Heart className="w-4 h-4 text-green-500" />;
      case "Dead":
        return <Skull className="w-4 h-4 text-red-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Alive":
        return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30";
      case "Dead":
        return "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30";
    }
  };

  const { char_id } = useParams();
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/${char_id}`)
      .then((res) => {
        setChar(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.warn(err);
      });
  }, [char_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading character details</div>;

  console.log("char_id", char_id);
  console.log("char", char);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6 flex flex-col items-center">
      {/* Başlık */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          CHARACTER DETAILS
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full" />
      </div>

      {/* Karakter Kartı */}
      <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Üst Bilgi */}
        <div className="border-b border-gray-200 dark:border-gray-700/50 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {char.name}
          </h2>
        </div>

        {/* İçerik */}
        <div className="flex flex-col md:flex-row">
          {/* Resim ve Temel Bilgiler */}
          <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700/50">
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                src={char.image}
                alt={char.name}
              />
            </div>

            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm ${getStatusColor(
                char.status
              )}`}
            >
              {getStatusIcon(char.status)}
              <span>{char.status}</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700/50 pb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Species:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {char.species}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700/50 pb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Gender:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {char.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Detaylı Bilgiler */}
          <div className="md:w-2/3 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Origin
                </h3>
                <p className="text-gray-900 dark:text-white">
                  {char.origin?.name}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </h3>
                <p className="text-gray-900 dark:text-white">
                  {char.location?.name}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Episodes
                </h3>
                <p className="text-gray-900 dark:text-white">
                  {char.episode?.length} episodes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
