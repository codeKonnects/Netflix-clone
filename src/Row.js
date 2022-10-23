import React, {useState, useEffect} from 'react'
import instance from "./axios"
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer"

// w220_and_h330_face

const base_url =  "https://www.themoviedb.org/t/p/original"

function Row({title, fetchUrl, isLargeRow}) {
const [movies, setMovies] = useState([]); 
const [trailerUrl, setTrailerUrl] = useState(""); 

useEffect(() => {
    
    async function fetchData(){
        const request = await instance.get(fetchUrl)
        setMovies(request.data.results);
        return request;
    }
    fetchData();
}, [fetchUrl])

const opts = {
    height: '390',
    width: '100% ',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl){
        setTrailerUrl("");
    }else{
        movieTrailer(movie?.name || "").then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
           setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error))
    }
  };

// console.log(movies);
    return (
        <div className = "row">
            <h2>{title}</h2>
            {/* ti tle*/}
            <div className = "row_posters">
                {/* {posters} */}
                {movies.map(movie =>(
                    <img 
                    key ={movie.id}
                    onClick = {() => handleClick(movie)}
                    className = {`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src = {`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
                    alt = {movie.name}/>
                ))}
            </div>
             {/* youtube embed */}
             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            
            {/*container */}
        </div>
    )
}

export default Row;
