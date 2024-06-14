import { Session, getServerSession } from "next-auth";

import { IMovieList } from "@/common/interfaces/Movies.interface";

import { fetchWatchListMoviesData, getWatchList } from "@/app/actions";
import MovieList from "@/components/movie/MovieList";

const WatchList = async () => {
  const session: Session | null = await getServerSession();
  const watchListMovieIds: number[] = await getWatchList({
    email: session?.user?.email,
  });

  const movieList: IMovieList = await fetchWatchListMoviesData({
    watchListMovieIds,
  });

  return (
    <div className="sm:mt-20">
      <MovieList movieList={movieList} />
    </div>
  );
};

export default WatchList;
