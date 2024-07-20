import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  fetchEpisodes,
  fetchNextEpisodes,
} from "../store/actions/episodeActions";
export default function Episodes() {
  const dispatch = useDispatch();
  const episodes = useSelector((store) => store.shows.episodes);
  const pageNum = useSelector((store) => store.shows.page);
  const hasNext = useSelector((store) => store.shows.hasNext);
  console.log(episodes);
  const [chars, setChars] = useState([]);
  useEffect(() => {
    dispatch(fetchEpisodes());
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setChars(res.data.results))
      .catch((err) => console.warn(err));
  }, [dispatch]);
  console.log(chars);
  const getCharacterDataByEpisode = (episode) => {
    return chars.filter((char) => char.episode.includes(episode.url));
  };
  const handleClick = () => {
    dispatch(fetchNextEpisodes(pageNum));
  };
  return (
    <div className="w-svw flex flex-col bg-slate-100 items-center justify-center dark:bg-slate-900">
      <div className="py-14">
        {" "}
        <h1 className="font-bold text-8xl leading-10 text-slate-900  dark:text-slate-200">
          EPISODES
        </h1>
      </div>
      {episodes.map((ep) => {
        const characters = getCharacterDataByEpisode(ep);
        const ssn = ep.episode.split("");
        const num = [ssn[1], ssn[2]];
        const season = Number(num.join(""));
        console.log(ep.episode);
        const othernum = [ssn[4], ssn[5]];
        const eps = Number(othernum.join(""));
        console.log(season);
        return (
          <div
            key={ep.id}
            className="w-[580px] min-h-[250px] flex flex-col m-4 justify-between border-solid border-slate-600 bg-slate-200 border-2 rounded-lg dark:bg-slate-500"
          >
            <div className="flex items-center justify-start p-4 border-solid border-b-2 border-slate-600">
              <h2 className="text-2xl font-bold ">{ep.name}</h2>
            </div>
            <div className="flex justify-between ">
              <div className=" w-[200px] max-h-[200px] flex flex-col justify-around items-start pl-4">
                <span className=" text-slate-900 font-medium">
                  SEASON:{season}
                </span>
                <span className=" text-slate-900 font-medium">
                  EPISODE:{eps}
                </span>
                <span className=" text-slate-900 font-medium">
                  AIR DATE: {ep.air_date}
                </span>
              </div>
              <div className="max-w-[300px]  flex flex-wrap m-4 items-center gap-1  border-solid border-[1px] p-2   border-slate-600 rounded-lg">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className="border-solid border-[1px] border-slate-600 rounded-lg p-1"
                  >
                    <Link to={`/details/${char.id}`}>
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-20 h-20"
                      />
                      <div className="w-20 lex flex-wrap">
                        {" "}
                        <span className="text-xs">{char.name}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-5">
        {hasNext && (
          <button
            className="py-5 px-3 border-solid border-slate-600 bg-slate-300 border-2 rounded-lg text-slate-600  dark:bg-slate-500 dark:text-slate-200"
            onClick={handleClick}
          >
            View more episodes
          </button>
        )}
        {!hasNext && (
          <span className="py-5 px-3 border-solid border-slate-600 bg-slate-300 border-2 rounded-lg text-slate-600  dark:bg-slate-500 dark:text-slate-200">
            Nothing left to show{" "}
          </span>
        )}
      </div>
    </div>
  );
}
