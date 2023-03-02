import React from "react";
import styles from "../VideoGameCard/VideogameCard.module.css";

export default function VideogameCard({ id , name, image, rating, genres }) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.cardName}>{name}</h3>
      </div>
      <div>
        <img
          className={styles.cardImage}
          src={image}
          alt="imagen"
          width="280"
          height="140"
        />
      </div>
      <div className={styles.cardTitle}>
        <h4 className={styles.rating}>Rating: {rating}</h4>
        <h4 className={styles.genres}>Géneros:</h4>
      </div>
      <div className={styles.genre}>
        {genres.map((genre) => (
          <h5 key={genre.name}>{genre.name}</h5>
        ))}
      </div>
    </div>
  );
}
