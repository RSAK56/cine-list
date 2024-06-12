import {
  IMovieDetails,
  IMovieList,
} from "@/common/interfaces/Movies.interface";

const MovieList = ({ movieList }: { movieList: IMovieList }) => {
  return (
    <div>
      {movieList?.results?.map((movie: IMovieDetails, index: number) => {
        return (
          <div key={index}>
            <h2>{movie.original_title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
