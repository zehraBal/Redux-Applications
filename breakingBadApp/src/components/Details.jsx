import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Details() {
  const { char_id } = useParams();
  const [char, setChar] = useState(null);
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${char_id}`)
      .then((res) => setChar(res.data))
      .catch((err) => console.warn(err));
  }, []);
  console.log("char_id", char_id);
  console.log(char);
  return (
    <div className="flex flex-col">
      <div>
        <h4>{char.name}</h4>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div>
            <img src={char.image} alt={char.name} />
          </div>
          <div>Status: {char.status} </div>
          <div>Species: {char.species} </div>
          <div>Gender: {char.gender}</div>
        </div>
        <div className="flex flex-col">
          <div>Origin:{char.origin.name}</div>
          <div>Location:{char.location.name}</div>
          <div>{char.episode}</div>
        </div>
      </div>
    </div>
  );
}
