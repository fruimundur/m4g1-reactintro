import { useState, useEffect } from 'react';

import MovieCard from './MovieCard'; 
import SearchIcon from './search.svg';
import './App.css';

// Importing the API here:
const API_URL =  'http://www.omdbapi.com?apikey=d1844c4e'; 


const App = () => {
// setting the variables and initial value of useState, which will be called upon further down
    const [movies, setMovies] = useState([]); 
    const [searchTerm, setSearchTerm] =  useState('');

// this block of code fetches data form the API once it's done loading
    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&S=${title }`);
        const data = await response.json();

        setMovies(data.Search  );
    }

// 'searching' for the Harry Potter movies from the API, so they will be the initial display of movies
    useEffect(() => {
        searchMovies('Harry Potter');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand </h1>

            <div className="search">
                <input
                  placeholder="Search for movies"
// setting the initial state form the useState on line 14 as the value for the input field
                  value={searchTerm}
// adding an onchange event which changes the state/value
                  onChange={(e) => setSearchTerm(e.target.value )}
                />
                <img
// adding an onclick event to the search button

                    src={SearchIcon}
                    alt="search icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

        {movies?.length > 0
// if the list of movies is larger than 0, then the MovieCard component will be rendered
            ? (
                <div className="cointainer">
                    {movies.map((movie) =>  (
                         <MovieCard movie={movie}  /> 
                    ))}
                </div>
            ) : (
// otherwise the 'No movies found' text will be displayed
                <div className="empty ">
                     <h2>No movies found</h2>
                </div> 
            )} 
        </div> 
    )
}

export default App; 