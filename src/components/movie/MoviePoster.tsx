import Image from "next/image";

const MoviePoster = ({ posterPath }: { posterPath: string }) => (
  <Image
    src={`https://image.tmdb.org/t/p/original/${posterPath}`}
    alt="movie-poster"
    width={300}
    height={300}
    className="sm:w-full rounded-lg"
  />
);

export default MoviePoster;
