import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions/index";
import syles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
  }

  return (
    <div className={syles.searchbar}>
      <input
        className={syles.input}
        type="text"
        value={name}
        placeholder="Busca un videojuego"
        onChange={(e) => handleImputChange(e)}
      />
      <button
        className={syles.btnSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}


