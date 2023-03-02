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
    console.log(singleVideogame);
    
    return (
      <div className={styles.all}>
         <Link to="/home">
              <button className={styles.btn}>Inicio</button>
            </Link>
        {singleVideogame && singleVideogame.length > 0 ? (

          
          <div className={styles.container}>
                <div  className={styles.bloque1}>
                        <div className={styles.divImg} >       
                                  <img src={singleVideogame[0].background_image} className={styles.img} alt="imagen detalle" /> 
                        </div>
                        <div  className={styles.subBloque}>
                                      <div className={styles.divName}>
                                              <h1 className={styles.name}>{singleVideogame[0].name}</h1>
                                      </div>
                                      <div className={styles.divDescr}>
                                              <p  className={styles.description}>{singleVideogame[0].description.replace(/<[^>]*>?/g, "")}</p>
                                      </div>
                        </div>
                </div>
                <div className={styles.subBloque2}>
                            <div className={styles.bloque2} >
                                  <div className={styles.divRel}>
                                              <h3 className={styles.title}>Lanzamiento </h3> <h3 className={styles.value}>{singleVideogame[0].released}</h3>
                                  </div>
                                  <div className={styles.divRating}>
                                                <h3 className={styles.title}>Rating </h3>
                                                <h3  className={styles.value}>{singleVideogame[0].rating}</h3>
                                  </div>
                            </div>
                            <div className={styles.bloque3}>
                                   <div  className={styles.subBloque3}>
                                          <div className={styles.divGen}>
                                                          <h3 className={styles.title}>Generos</h3>
                                          </div> 
                                          <div className={styles.divElement}>
                                                        {singleVideogame[0].genres.map((genre) => (
                                                        <h4 key={genre.name}>{genre.name}</h4>))}
                                            </div>
                                    </div>
                                    
                </div>
                 </div>
                 <div className={styles.subBloque4}>
                                              <div className={styles.divPlat}>
                                                        <h3 className={styles.title}>Plataformas</h3>
                                              </div> 
                                              <div className={styles.divElement}>
                                                        {singleVideogame[0].platforms.map((platform) => (
                                                        <h4 key={platform.name}>{platform.name}</h4> ))}
                                              </div>
                                    </div>
           
        
          </div>
          
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
  