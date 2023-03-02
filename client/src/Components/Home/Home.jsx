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
import Pages from "../Pages/Pages"
import VideoGameCard from "../VideoGameCard/VideoGameCard";
import  styles from "./Home.module.css"
import NavBar from "../NavBar/NavBar";



export default function Home() {
  const dispatch = useDispatch("");
  const allVideogames = useSelector((state) => state.videogames); 
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(3);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const genres = useSelector((state) => state.genres);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres())
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

  return (
    <div>

      <NavBar/>

      <div className={styles.filter}>
        <p>
          <span className={styles.orden}>
          Orden:
          <select onChange={(e) => handleSortName(e)} className={styles.select}>
            <option value="" className={styles.option}>Ordenar</option>
            <option value="asc" className={styles.option}>A/Z</option>
            <option value="desc" className={styles.option}>Z/A</option>
          </select>
          </span>
          <span className={styles.rating}>
          Rating:
          <select onChange={(e) => handleSortRating(e)} className={styles.select}>
            <option value="" className={styles.option}>Ordenar</option>
            <option value="ascendant" className={styles.option}>Ascendente</option>
            <option value="descendant" className={styles.option}>Descendente</option>
          </select>
          </span>
          <span  className={styles.genero}>
          Genero:
          <select onChange={(e) => handleFilterGenre(e)} className={styles.select}>
          <option value="all" className={styles.option}>Todos</option>
            {genres.map((genre) => (
              <option value={genre.name} className={styles.option}>{genre.name}</option>
            ))}
          </select>
          </span>
          <span>
          Origen:
          <select onChange={(e) => handleOriginFilter(e)} className={styles.select}>
            <option value="all" className={styles.option}>Todos</option>
            <option value={true} className={styles.option}>Creados</option>
            <option value="false" className={styles.option}>Existentes</option>
          </select>
          </span>
        </p>
      </div>

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
    allVideogames={allVideogames.length}
    setCurrentPage={setCurrentPage}
    currentPage={currentPage}
  />
</div>




    </div>
  );
}