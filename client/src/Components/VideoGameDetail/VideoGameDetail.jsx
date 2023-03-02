import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {  getDetail } from "../../redux/actions";
import styles from "../VideoGameDetail/VideoGameCard.module.css";

export default function VideogameDetail(props) {
    const { id } = useParams();
  
    const dispatch = useDispatch();
    
  
    useEffect(() => {
      dispatch(getDetail(id));
    }, [dispatch, id]);
  
    const singleVideogame = useSelector((state) => state.detail);
    
    
    return (
      <div>
        {singleVideogame.length > 0 ? (

          
          <div className={styles.container}>
  
            <div className={styles.bloque1}>
              <img src={singleVideogame[0].background_image} className={styles.img} alt="imagen detalle" /> 
              <div className={styles.name}>
                <h1>{singleVideogame[0].name}</h1>
              </div>
              <div className={styles.description}>
                <p>{singleVideogame[0].description.replace(/<[^>]*>?/g, "")}</p>
              </div>
            </div>
              <span className={styles.spancontainer}>
              <div className={styles.released}>
                <h3 className={styles.titleFont}>Lanzamiento:</h3> <h3>{singleVideogame[0].released}</h3>
              </div>
              
              <div className={styles.rating}>
                <h3 className={styles.titleFont}>Rating: </h3><h3>{singleVideogame[0].rating}</h3>
              </div>
              
              <div>
                <div className={styles.title}>
                  <h3 className={styles.titleFont}>Generos:</h3>
                </div> 
                <div className={styles.elements}>
                  {singleVideogame[0].genres.map((genre) => (
                    <h4 key={genre.name}>{genre.name}</h4>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.title}>
                  <h3 className={styles.titleFont}>Plataformas:</h3>
                </div> 
                <div className={styles.elements}>
                  {singleVideogame[0].platforms.map((platform) => (
                    <h4 key={platform.name}>{platform.name}</h4>
                  ))}
                </div>
              </div>
              </span>
            

            
        
            <Link to="/home">
              <button className={styles.btn}>Inicio</button>
            </Link>
        
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
  