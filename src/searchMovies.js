import React, {useState} from "react";
import MovieCard from './movieCard.js';
export default function SearchMovies(){
    
    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>  
            <center>
            <div id="searchbar">
                <form onSubmit={searchMovies}>
                    <input placeholder="Search Movie" name="search" value={query} onChange={(e) => setQuery(e.target.value)} type="search"></input>
                    <div id="search-options">
                        <button type="submit" class="button">Search </button>
                    </div>
                </form>
            </div>
            
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <MovieCard movie={movie} key={movie.id} />
                ))}
            </div> 
            </center>   
        </>
    )
}