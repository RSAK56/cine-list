import Image from "next/image";

import { IFetchedMovieInfo } from "@/common/interfaces/Movies.interface";

import Slider from "@/components/rating-meter/Slider";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const MovieDetails = async ({ params }: any) => {
  const movieId = params?.id;
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  const fetchedMovieInfo = await fetch(apiUrl);
  const movieInfoJSON: IFetchedMovieInfo = await fetchedMovieInfo.json();

  return (
    <div>
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movieInfoJSON?.backdrop_path || movieInfoJSON?.poster_path
          }`}
          alt="movie-poster"
          width={300}
          height={300}
          className="sm:w-full rounded-lg"
        />
        <div className="p-2">
          <div className="flex flex-row gap-2 justify-start items-center mb-3">
            <h1 className="text-lg  font-bold">
              {movieInfoJSON?.title || movieInfoJSON?.name}
            </h1>
            <p>
              {movieInfoJSON?.release_date || movieInfoJSON?.first_air_date}
            </p>
            <div className="">
              <Slider rating={movieInfoJSON?.vote_average} clockwise={true} />
            </div>
          </div>
          <p>{movieInfoJSON?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
