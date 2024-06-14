import MovieList from "@/components/movie/MovieList";
import { IMovieList } from "@/common/interfaces/movie.interface";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface HomeProps {
  searchParams: {
    category?: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const category = searchParams.category || "trending";
  const apiUrl = `https://api.themoviedb.org/3${
    category === "trending" ? "/trending/all/week" : "/movie/top_rated"
  }?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  try {
    const fetchMovies = await fetch(apiUrl, { next: { revalidate: 360000 } });

    if (!fetchMovies.ok) {
      throw new Error(
        `Could not fetch movies. HTTP status: ${fetchMovies.status}`,
      );
    }

    const fetchedMoviesJSON: IMovieList = await fetchMovies.json();

    return (
      <div className="sm:mt-20">
        <MovieList movieList={fetchedMoviesJSON} />
      </div>
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default Home;
