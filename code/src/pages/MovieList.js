import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './movielist.css';
import './director.css';

export const MovieList = ({ setDirector, director, directorName }) => {
	const [ movies, setMovies ] = useState([]);
	let filteredMovies = [];

	useEffect(
		() => {
			fetch(
				`https://api.themoviedb.org/3/person/${director}/movie_credits?api_key=3506f645d143411491b3a1c8d00f1217`
			)
				.then((res) => res.json())
				.then((json) => {
					setMovies(json.crew);
				});
		},
		[ director ]
	);

	if (director !== undefined) {
		const filteredMoviesIds = [];

		movies.forEach((movie) => {
			if (!filteredMoviesIds.includes(movie.id) && !filteredMoviesIds.includes(movie.original_title)) {
				if (
					movie.department.toLowerCase().includes('directing') ||
					movie.department.toLowerCase().includes('writing')
				) {
					if (movie.poster_path !== null && movie.release_date !== '') {
						filteredMoviesIds.push(movie.id);
						filteredMoviesIds.push(movie.original_title);
						filteredMovies.push(movie);
					}
				}
			}
		});
	}

	// if (director !== '') {
	return (
		<div className="site-container">
			<h1>Written or directed by {directorName}</h1>
			<div className="movies-container">
				{filteredMovies.map((movie) => (
					<Link key={movie.id} to={`/${director}/${movie.id}`}>
						<div className="movie-card">
							<img
								className="img-poster"
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.original_title}
							/>

							<div className="movie-card-layer" />
							<div className="text-container">
								<h2>{movie.original_title}</h2>
								<p>{movie.release_date}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
