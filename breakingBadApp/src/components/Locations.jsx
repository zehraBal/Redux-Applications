import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  fetchNextLocations,
} from "../store/actions/locateActions";

export default function Locations() {
  const dispatch = useDispatch();
  const locates = useSelector((store) => store.locate.locations);
  const pageNum = useSelector((store) => store.locate.page);
  const hasNext = useSelector((store) => store.locate.hasNext);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(fetchNextLocations(pageNum));
  };
  return (
    <div className="w-svw flex flex-col items-center justify-center bg-slate-100 m-0 p-0 dark:bg-slate-900">
      <div className="py-14">
        {" "}
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-200 ">
          LOCATIONS
        </h1>
      </div>
      <div className="flex flex-wrap  items-center justify-center">
        {locates.map((loc) => {
          return (
            <div
              key={loc.id}
              className="w-[300px] h-[250px] flex flex-col justify-evenly m-4 border-solid border-slate-600 bg-slate-200 border-2 rounded-lg shadow-md dark:bg-slate-500"
            >
              <div className="flex items-center justify-start p-4 border-solid border-b-2 border-slate-600">
                <h2 className="text-2xl font-bold ">{loc.name}</h2>
              </div>
              <div>
                {" "}
                <div className=" w-[200px] h-[150px] flex flex-col justify-around items-start pl-4">
                  <span className=" text-slate-900 font-medium">
                    TYPE:{loc.type}
                  </span>
                  <span className=" text-slate-900 font-medium">
                    DIMENSION:{loc.dimension}
                  </span>
                  <span>NUMBER of RESIDENTS:{loc.residents.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        {hasNext && (
          <button
            className="py-5 px-3 border-solid border-slate-600 bg-slate-300 border-2 rounded-lg text-slate-600  dark:bg-slate-500 dark:text-slate-200"
            onClick={handleClick}
          >
            View more locations
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
