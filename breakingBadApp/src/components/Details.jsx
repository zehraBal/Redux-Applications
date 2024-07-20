import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
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
    <div className="w-svw h-svh text-2xl flex items-center justify-center">
      <div className="w-1/2 flex flex-col p-4 justify-between border-solid border-slate-600 border-2 rounded-lg bg-slate-200">
        <div>
          <h4 className="text-4xl font-bold p-4 flex items-center justify-start">
            {char.name}
          </h4>
        </div>
        <div className="flex justify-between  gap-5 p-9">
          <div className="flex flex-col items-start justify-between">
            <div className="w-[251px] h-[251px]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={char.image}
                alt={char.name}
              />
            </div>
            <div>
              Status:{" "}
              <span
                className={
                  char.status === "Alive" ? " text-lime-500" : "text-red-500"
                }
              >
                {char.status}
              </span>{" "}
            </div>
            <div>Species: {char.species}</div>
            <div>Gender: {char.gender}</div>
          </div>
          <div className="flex flex-col items-start justify-start gap-5">
            <div>Origin: {char.origin?.name}</div>
            <div>Location: {char.location?.name}</div>
            <div>Episodes: {char.episode?.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
