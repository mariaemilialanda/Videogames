import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { getVideogames } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar.jsx';
import styles from "./NavBar.module.css"

export default function NavBar() {
    const dispatch = useDispatch("");
    
    useEffect(() => {
        dispatch(getVideogames());
      }, [dispatch]);
      
    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
      }

  return (
    <div className={styles.navbar}>
         <div className={styles.container}>
        <button  className={styles.button} onClick={(e) => { handleClick(e)}} >Recargar</button>
        <Link to={"/create"}><button className={styles.button} >Crear</button></Link>
        </div>
        <SearchBar />
    </div>
  )
}
