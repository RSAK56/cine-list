import Link from "next/link";

import { IMovieDetails } from "@/common/interfaces/Movies.interface";
import Image from "next/image";
import { InfoIcon } from "../icons/info/InfoIcon";
import Slider from "../rating-meter/Slider";

const MovieCard = ({ movie }: { movie: IMovieDetails }) => {
  const truncatedOverview =
    movie?.overview.length > 120
      ? movie.overview.substring(0, 120) + "..."
      : movie?.overview;

  const movieTitle = movie?.original_title || movie?.name;
  const truncatedTitle =
    movieTitle && movieTitle?.length > 20
      ? movieTitle?.substring(0, 20) + "..."
      : movieTitle;

  return (
    <div className="flex justify-center items-center transition-all duration-500 relative">
      <Link href={`/movie/${movie?.id}`}>
        {/* Adding 2 paths differering by condition is due to some movies were missing poster_path value */}
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie?.poster_path || movie?.backdrop_path
          }`}
          alt="movie-poster"
          width={276}
          height={414}
          className="sm:rounded-lg"
        />
        {/* content */}
        <div className="absolute w-full h-full bottom-0 pt-[85%] px-[4%] pb-0 opacity-0 bg-card-hover-gradient transition-all duration-500 sm:rounded-lg hover:opacity-[1]">
          <h1 className="text-white text-lg font-bold">{truncatedTitle}</h1>
          <div className="flex gap-1">
            <h3 className="h-fit">
              <InfoIcon width={18} height={18} fillColor="white" />
            </h3>
            <p className={`text-white text-sm`}>
              {movie?.release_date || movie?.first_air_date}
            </p>
          </div>
          <p className={`text-white text-sm`}>{truncatedOverview}</p>
          <div className="float-right">
            <Slider rating={movie?.vote_average} clockwise={true} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
