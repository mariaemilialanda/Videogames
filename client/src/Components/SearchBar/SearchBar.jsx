import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions/index";
import styles from "./SearchBar.module.css";

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
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        type="text"
        value={name}
        placeholder="Busca un videojuego"
        onChange={(e) => handleImputChange(e)}
      />
      <button
        className={styles.buttonSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}


