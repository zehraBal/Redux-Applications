import { Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon, Users, Tv, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setCharacterFilter,
  setLocationFilter,
  setEpisodeFilter,
  setActiveTab,
} from "../store/slices/filtersSlice";
import { useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/uiSlice";
import { useEffect } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.ui.theme);
  const activeTab = useSelector((state) => state.filters.activeTab);

  const handleSearch = (value) => {
    if (location.pathname === "/") {
      dispatch(setCharacterFilter({ name: value }));
    } else if (location.pathname === "/locations") {
      dispatch(setLocationFilter({ name: value }));
    } else if (location.pathname === "/episodes") {
      dispatch(setEpisodeFilter({ name: value }));
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const tabs = [
    { id: "characters", label: "Characters", icon: Users, path: "/" },
    { id: "episodes", label: "Episodes", icon: Tv, path: "/episodes" },
    { id: "locations", label: "Locations", icon: MapPin, path: "/locations" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Üst Kısım (Logo + Arama) */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-500/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R&M</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                Rick & Morty Explorer
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors w-64"
                />
              </div>

              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigasyon Çubuğu */}
      <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={() => dispatch(setActiveTab(tab.id))}
                  className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
