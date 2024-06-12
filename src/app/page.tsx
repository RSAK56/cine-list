import MovieList from "@/components/movies/MovieList";

import { IMovieList } from "@/common/interfaces/Movies.interface";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Home = async ({ searchParams }: any) => {
  const category = searchParams.category || "trending" || "top-rated";

  const fetchMovies = await fetch(
    `https://api.themoviedb.org/3${
      category === "trending" ? "/trending/all/week" : "/movie/top_rated"
    }?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

  if (!fetchMovies.ok) {
    throw new Error("Could not fetch movies. Something went wrong!");
  }

  const fetchedMoviesJSON: IMovieList = await fetchMovies.json();

  return (
    <div>
      <MovieList movieList={fetchedMoviesJSON} />
    </div>
  );
};

export default Home;
