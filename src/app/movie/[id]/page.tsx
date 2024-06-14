import { Session, getServerSession } from "next-auth";

import {
  IFetchedMovieInfo,
  IProductionCompany,
} from "@/common/interfaces/movie.interface";

import { getWatchList } from "@/app/actions";

import MoviePoster from "@/components/movie/MoviePoster";
import MovieDetailsInfo from "@/components/movie/MovieDetailsInfo";
import MovieProductionDetails from "@/components/movie/MovieProductionDetails";
import { IServerSideProps } from "@/common/interfaces/server-side-prop.interface";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const MovieDetails = async ({ params }: IServerSideProps) => {
  const session: Session | null = await getServerSession();

  const fetchedWatchList = await getWatchList({
    email: session?.user?.email,
  });
  const watchListMovieIds: number[] = Array.isArray(fetchedWatchList)
    ? fetchedWatchList
    : [];

  const movieId = params?.id;
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  const fetchedMovieInfo = await fetch(apiUrl);
  const movieInfoJSON: IFetchedMovieInfo = await fetchedMovieInfo?.json();

  const movieExistsInWatchList = watchListMovieIds?.includes(movieInfoJSON?.id);

  console.log("movieInfoJSON", movieInfoJSON);
  return (
    <div>
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <MoviePoster
          posterPath={
            movieInfoJSON?.backdrop_path || movieInfoJSON?.poster_path
          }
        />
        <MovieDetailsInfo
          session={session}
          movieInfo={movieInfoJSON}
          movieExistsInWatchList={movieExistsInWatchList}
        />
      </div>
      <div className="p-4 my-4 max-w-6xl mx-auto">
        {movieInfoJSON?.production_companies?.length ? (
          <div className="flex sm:justify-center md:justify-start">
            <p className="text-xl font-bold">Production Companies</p>
          </div>
        ) : (
          <></>
        )}
        <div className="my-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {movieInfoJSON?.production_companies?.map(
            (productionCompany: IProductionCompany, index: number) => (
              <MovieProductionDetails
                productionCompany={productionCompany}
                key={index}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
