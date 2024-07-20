import { Link } from "react-router-dom";

export default function Characters({ character, keyNum }) {
  return (
    <div
      key={keyNum}
      className="flex flex-wrap gap-10 flex-grow items-center justify-center"
    >
      {character.map((char) => {
        return (
          <div
            key={char.id}
            className="w-60 h-72 border-solid border-slate-600 rounded-lg border-2 flex flex-col items-center justify-evenly shadow-lg bg-slate-200"
          >
            <Link to={`/details/${char.id}`}>
              <div className="w-52 h-52 ">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                  src={char.image}
                  alt={char.name}
                />
              </div>
              <div className="flex flex-wrap items-center justify-center ">
                <span className="text-lg font-medium text-slate-950 r">
                  {char.name}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
