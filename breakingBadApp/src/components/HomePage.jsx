import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, fetchNextPage } from "../store/actions/charActions";
import Characters from "./Characters";

export default function HomePage() {
  const dispatch = useDispatch();
  const characters = useSelector((store) => store.stars.characters);
  const isLoading = useSelector((store) => store.stars.isLoading);
  const isError = useSelector((store) => store.stars.error);
  const nextPage = useSelector((store) => store.stars.page);
  const hasNextPage = useSelector((store) => store.stars.hasNext);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleViewMore = () => {
    dispatch(fetchNextPage(nextPage));
  };

  if (isError) {
    return <div>{isError}</div>;
  }

  console.log(characters);

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-100 dark:bg-slate-900 ">
      <div className="py-14">
        {" "}
        <h1 className="font-bold text-8xl leading-10 text-slate-900 dark:text-slate-300 ">
          CHARACTERS
        </h1>
      </div>
      <Characters character={characters} />
      <div className="mt-5">
        {hasNextPage && (
          <button
            className="py-5 px-3 border-solid border-slate-600 bg-slate-300 border-2 rounded-lg text-slate-600 dark:bg-slate-500 dark:text-slate-200"
            onClick={handleViewMore}
          >
            View more characters
          </button>
        )}
        {!hasNextPage && (
          <span className="py-5 px-3 border-solid border-slate-600 bg-slate-300 border-2 rounded-lg text-slate-600  dark:bg-slate-500 dark:text-slate-200">
            Nothing left to show{" "}
          </span>
        )}
      </div>
    </div>
  );
}
