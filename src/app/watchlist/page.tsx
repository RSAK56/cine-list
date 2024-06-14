"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { toast } from "react-hot-toast";

import { IMovieList } from "@/common/interfaces/movie.interface";

import MovieList from "@/components/movie/MovieList";
import CustomLoader from "@/components/loader/Loader";

import { fetchWatchListMoviesData, getWatchList } from "@/app/actions";

const WatchList = () => {
  const { data: session } = useSession();
  const [movieList, setMovieList] = useState<IMovieList | null>(null);
  const [isWatchListLoading, setIsWatchListLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsWatchListLoading(true);
        if (session?.user?.email) {
          const watchListMovieIds: number[] = await getWatchList({
            email: session.user.email,
          });
          const fetchedMovieList: IMovieList = await fetchWatchListMoviesData({
            watchListMovieIds,
          });
          setMovieList(fetchedMovieList);
        }
        setIsWatchListLoading(false);
      } catch (error) {
        setIsWatchListLoading(false);
        toast.error(`Unable to fetch watchlist`);
      }
    };

    fetchData();
  }, [session]);

  return (
    <>
      {isWatchListLoading ? (
        <CustomLoader />
      ) : (
        <div className="sm:mt-20">
          <MovieList movieList={movieList} />
        </div>
      )}
    </>
  );
};

export default WatchList;
