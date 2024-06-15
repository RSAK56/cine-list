import TmdbImage from "../image/TmdbImage";

const MoviePoster = ({ posterPath }: { posterPath: string }) => (
  <TmdbImage
    src={posterPath}
    alt="movie-poster"
    width={300}
    height={300}
    className="sm:w-full rounded-lg"
  />
);

export default MoviePoster;
