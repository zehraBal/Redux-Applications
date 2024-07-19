import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, fetchNextPage } from "../store/actions/actions";
import Characters from "./Characters";

export default function HomePage() {
  const dispatch = useDispatch();
  const characters = useSelector((store) => store.characters);
  const isLoading = useSelector((store) => store.isLoading);
  const isError = useSelector((store) => store.error);
  const nextPage = useSelector((store) => store.page);
  const hasNextPage = useSelector((store) => store.hasNext);

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
    <div className="flex flex-col items-center justify-center gap-6">
      <Characters character={characters} />
      <div>
        {isLoading && <div>Loading...</div>}
        {hasNextPage && (
          <button
            onClick={handleViewMore}
            className="h-8 w-24 border-x-2 border-solid rounded-xl border-black bg-slate-500"
          >
            View More...
          </button>
        )}
        {!hasNextPage && <div>Nothing left to show </div>}
      </div>
    </div>
  );
}
