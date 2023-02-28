import {
    GET_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_GENRES,
    GET_DETAILS,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    FILTER_BY_ORIGIN,
    FILTER_BY_GENRE,
  } from "../actions/index";
  
  const initialState = {
    allVideogames: [],
    videogames: [],
    filteredVideogames: [],
    genres: [],
    platforms:[],
    detail: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          allVideogames: action.payload,
          videogames: action.payload,
        };
  
      case GET_VIDEOGAMES_BY_NAME:
        return {
          ...state,
          videogames: action.payload,
        };
  
      case GET_GENRES:
        return {
          ...state,
          genres: action.payload,
        };
  
  
      case "POST_VIDEOGAME":
        return {
          ...state,
        };
  
      case ORDER_BY_NAME:
        let nameSort= state.videogames.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return action.payload === "asc" ? -1 : 1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return action.payload === "asc" ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          videogames: nameSort,
        };
  
      case ORDER_BY_RATING:
        let ratingSort= state.videogames.sort((a, b) => {
          if (a.rating < b.rating) {
            return action.payload === "ascendant" ? -1 : 1;
          }
          if (a.rating > b.rating) {
            return action.payload === "ascendant" ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          videogames: ratingSort,
        };
  
      case FILTER_BY_ORIGIN:
        const allVideogames = state.allVideogames;
        const originFilter =
          action.payload === "all"
            ? allVideogames
            : allVideogames.filter((el) => el.isDataBase === action.payload);
        return {
          ...state,
          videogames: originFilter,
        };
  
      case FILTER_BY_GENRE:
        const allGenres = state.allVideogames;
        const videogamesFiltered = [];
        allGenres.forEach((videogame) =>
          videogame.genres.forEach((genre) => {
            if (genre.name === action.payload) {
              videogamesFiltered.push(videogame);
            }
          })
        );
        return {
          ...state,
          videogames:
            action.payload === "all" ? allGenres : videogamesFiltered,
        };
  
        
      case GET_DETAILS:
        return {
          ...state,
          detail: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;