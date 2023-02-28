import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterVideogamesByOrigin,
  filterVideogamesByGenre,
  orderByName,
  orderByRating,
  getGenres,
} from "../../redux/actions";
import Pages from "../Pages/Pages";
import VideoGameCard from "../VideoGameCard/VideoGameCard";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(3);

  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const originFilter = useSelector((state) => state.originFilter);
  const genreFilter = useSelector((state) => state.genreFilter);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleOriginFilter(e) {
    dispatch(filterVideogamesByOrigin(e.target.value));
  }

  function handleFilterGenre(e) {
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  function currentVideogames(videogames, order, originFilter, genreFilter) {
    const filteredVideogames =
      originFilter === "all"
        ? videogames
        : videogames.filter((vg) => vg.isDatabase === originFilter);
    const sortedVideogames =
      order === "asc"
        ? filteredVideogames.sort((a, b) => a.name.localeCompare(b.name))
        : order === "desc"
        ? filteredVideogames.sort((a, b) => b.name.localeCompare(a.name))
        : order === "ascendant"
        ? filteredVideogames.sort((a, b) => a.rating - b.rating)
        : order === "descendant"
        ? filteredVideogames.sort((a, b) => b.rating - a.rating)
        : filteredVideogames;
    const genreFilteredVideogames =
      genreFilter === "all"
        ? sortedVideogames
        : sortedVideogames.filter((vg) => {
            return vg.genres.some((g) => g.name === genreFilter);
          });
    return genreFilteredVideogames;
  }

  const currentVideogamesList = currentVideogames(
    videogames,
    order,
    originFilter,
    genreFilter
  );

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const pagintedVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
  }

  <div className={styles.cards}>
  {currentVideogames.map((videogames) => {
    return (
      <div key={videogames.id}>
        <Link to={"/home/" + videogames.id} className={styles.link}>
        <VideoGameCard
          isDataBase={videogames.isDatabase}
          id={videogames.id}
          name={videogames.name}
          image={videogames.background_image}
          rating={videogames.rating}
          genres={videogames.genres}
        />
        </Link>
      </div>
    );
  })}
</div>

<div>
  <Pages
    videogamesPerPage={videogamesPerPage}
    totalVideogames={games.length}
    setCurrentPage={setCurrentPage}
  />
</div>

</div>
