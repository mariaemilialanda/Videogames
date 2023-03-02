import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getGenres,
  postVideogame,
} from "../../redux/actions/index";
import styles from "./CreateVideogame.module.css"


function validate(input) {
  let errors = {};

        if (!input || typeof input !== 'object') {
          throw new Error('Se debe proporcionar un objeto de entrada');
        }
        if (!input.name) {
          errors.name = "Por favor, ingrese un nombre";
        } else {
          if (input.name.replace(/ /g, "") === "") {
            errors.name = "Por favor, ingrese un nombre";
          }
          if (input.name.replace(/ /g, "").match(/[^A-Za-z0-9]/)) {
            errors.name = "El nombre solo admite caracteres alfa-numéricos";
          }
          if (input.name.length > 25) {
            errors.name = "25 caracteres máximo";
          }
        }

        if (!input.description) {
          errors.description = "Por favor, ingrese una descripción";
        } else {
          if (input.description.replace(/ /g, "") === "") {
            errors.description = "Por favor, ingrese una descripción";
          }
        }

        if (input.rating !== undefined && (input.rating < 0 || input.rating > 5)) {
          errors.rating = "El rango del rating solo puede ir desde 0 a 5";
        } 

        if (!input.released) {
          errors.released = "Por favor, ingrese una fecha";
        } else {
          const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
          if (!dateRegex.test(input.released)) {
            errors.released = "Por favor, ingrese una fecha válida en formato YYYY-MM-DD";
          }
        }
        return errors;
}

 export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);  
  const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
      background_image: "",
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    console.log(input)

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckboxChange(e) {
    const name = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setInput({
        ...input,
        genres: [...input.genres, {name}],
      });
    } else {
      setInput({
        ...input,
        genres: input.genres.filter((genre) => genre !== name),
      });
    }
  }

  const selectPlat = (e)=> {
    const name = e.target.value
     setInput({
         ...input,
         platforms: [...input.platforms, {name}]
     })
}

  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(errors).length) {
      dispatch(postVideogame(input));
      setInput({
        background_image: "",
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      alert("El videojuego se creo correctamente");
      navigate("/home");
    } else {
      alert("Porfavor, revise la información agregada");
    }

  }
  return (
    <div className={styles.container}>
      <div>
      <Link to="/home">
        <button className={styles.button}>Inicio</button>
      </Link>
      </div>
      <div className={styles.general}>

      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>   
        <div className={styles.divTitle}>
          <h1>  &#x1f3ae; Crea tu propio videojuego  &#x1f3ae;</h1>
        </div>
        <div className={styles.divName}>
          <label className={styles.label}>Nombre:</label>
          <input className={styles.input} type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}/>
          {errors?.name && <p className={styles.errors}>{errors.name}</p>}
        </div>
        <div className={styles.divDescription}>
          <label className={styles.label}>Descripción:</label> <textarea className={styles.textarea} type="text" value={input.description} name="description" onChange={(e) => handleChange(e)} />
          {errors?.description && <p className={styles.errors}>{errors.description}</p>}
        </div>
        <div className={styles.divRating}> 
          <label className={styles.label}>Rating:</label> <input className={styles.input} type="number" value={input.rating} name="rating" onChange={(e) => handleChange(e)} />
          {errors?.rating && <p className={styles.errors}>{errors.rating}</p>}
        </div>
        <div className={styles.divReleased}>
          <label className={styles.label}>Lanzamiento:</label>
            <input className={styles.input} type="Date" value={input.released} name="released" min="1900-00-00" max="2050-12-31" onChange={(e) => handleChange(e)} />
          {errors?.released && <p className={styles.errors}>{errors.released}</p>}
        </div>
        <div className={styles.divImg}> 
          <label className={styles.label}>Imagen:</label> <input className={styles.input} type="text" value={input.background_image} name="background_image" onChange={(e) => handleChange(e)}/>
       </div>
       <div className={styles.divGen}>
        <label className={styles.generos}>Géneros:</label>
                      {genres.map((genre) => (
                        <div key={genre.id} className={styles.itemGeneros}>
                          <input
                            type="checkbox"
                            id={genre.id}
                            name={genre.name}
                            value={genre.name}
                            onChange={handleCheckboxChange}
                            checked={input.genres.includes(genre.name)}
                          />
                          <label htmlFor={genre.id}>{genre.name}</label>
                         </div>))}
          </div>

          <div className={styles.container}>
                <label className={styles.platforms} htmlFor="">Platforms:</label>
                <select className={styles.select} name="platforms" id="" onChange={(e)=>selectPlat(e)}>
                <option className={styles.option} value="Ps3">Ps3</option>
                <option className={styles.option} value="Ps4">Ps4</option>
                <option className={styles.option} value="Ps Vita">Ps Vita</option>
                <option className={styles.option} value="Xbox">XBox</option>
                <option className={styles.option} value="Xbox 360">Xbox 360</option>
                <option className={styles.option} value="Nintendo">Nintendo</option>
                <option className={styles.option} value="MacOs">MacOS</option>
                <option className={styles.option} value="PC">PC</option>
                <option className={styles.option} value="Linux">Linux</option>
                </select>
            </div>
           
      </form>

     </div>

      <button className={styles.btn} type="submit"  onClick={(e) => handleSubmit(e)}>Crear</button>

    </div>
  )};