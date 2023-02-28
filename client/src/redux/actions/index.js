import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const GET_GENRES = "GET_GENRES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";


export function getVideogames() {
    return async function (dispatch) {
      try {
        var videogames = await axios.get("http://localhost:3001/videogames");
        return dispatch({
          type: GET_VIDEOGAMES,
          payload: videogames.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getVideogamesByName(name) {
    return async function (dispatch) {
      try {
        var videogames = await axios.get(
          `http://localhost:3001/videogames?name=${name}`
        );
        return dispatch({
          type: GET_VIDEOGAMES_BY_NAME,
          payload: videogames.data,
        });
      } catch (error) {
        alert(error);
      }
    };
  }
  export function getDetail(id) {
    return async function (dispatch) {
      try {
        var videogameDetail = await axios.get(`http://localhost:3001/videogames/${id}`,id);
        return dispatch({
          type: GET_DETAILS,
          payload: videogameDetail.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getGenres() {
    return async function (dispatch) {
      try {
        var genres = await axios.get("http://localhost:3001/genres");
        return dispatch({
          type: GET_GENRES,
          payload: genres.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }




  export function postVideogame(payload) {
    return async function (dispatch) {
      try {
        const newVideogame = await axios.post(
          "http://localhost:3001/videogames",
          payload
        );
        return newVideogame;
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }
  
  export function orderByRating(payload) {
    return {
      type: ORDER_BY_RATING,
      payload,
    };
  }
  
  export function filterVideogamesByOrigin(payload) {
    return {
      type: FILTER_BY_ORIGIN,
      payload,
    };
  }
  
  export function filterVideogamesByGenre(payload) {
    return {
      type: FILTER_BY_GENRE,
      payload,
    };
  }

