import {
  IMovieDetails,
  IMovieList,
} from "@/common/interfaces/Movies.interface";
import MovieCard from "./MovieCard";

const MovieList = ({ movieList }: { movieList: IMovieList }) => {
  return (
    <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 mx-auto max-w-6xl gap-4">
      {movieList?.results?.map((movie: IMovieDetails, index: number) => {
        return <MovieCard key={index} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
