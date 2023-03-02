import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div>
      <h1 className={styles.h1}>HENRY VIDEOGAMES</h1>
      <h2 className={styles.h2}>Bienvenidos</h2>
      <Link to="/home">
        <button className={`${styles.button} ${styles.blink}`}>START!</button>
      </Link>
      </div>
      
    </div>
  )
}
