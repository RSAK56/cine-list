"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "react-hot-toast";

import { TButtonIconProps } from "@/common/types/button.types";

import { fetchWatchListMoviesData, getWatchList } from "@/app/actions";

import { IMovieList } from "@/common/interfaces/movie.interface";

import NoData from "@/components/fallbacks/NoData";
import MovieList from "@/components/movie/MovieList";
import CustomLoader from "@/components/loader/Loader";
import { MovieIcon } from "@/components/icons/movie/MovieIcon";
import CustomIconButton from "@/components/button/CustomIconButton";

const WatchList = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [movieList, setMovieList] = useState<IMovieList | null>(null);

  const [isWatchListLoading, setIsWatchListLoading] = useState<boolean>(false);

  // Initial watchlist data fetching
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
      } catch (error) {
        toast.error(`Unable to fetch watchlist`);
      } finally {
        setIsWatchListLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const redirectToHome = () => {
    router.push("/");
  };

  const renderContent = () => {
    if (isWatchListLoading) {
      // Display loader component
      return <CustomLoader />;
    } else if (movieList && movieList.results && movieList.results.length > 0) {
      // Display the movie list
      return (
        <div className="sm:mt-20">
          <MovieList movieList={movieList} />
        </div>
      );
    } else {
      // Check if movieList has been fetched
      return (
        <div className="flex justify-center mt-80">
          {movieList !== null && (
            <NoData
              containerClassNames="flex flex-col items-center"
              title="No Movies Here!"
              message="Let's add some to your watchlist"
              titleClassName="font-bold text-xl"
              messageClassName="font-semibold text-lg"
              childImageContainerClassName="flex flex-row justify-center items-center gap-2"
              showImage={true}
              imageURL="/png/popcorn-pointing.png"
              imageWidth={120}
              imageHeight={120}
              altText="no-data-image"
            >
              <CustomIconButton
                color="danger"
                variant="bordered"
                text="View Movies"
                iconHeight={20}
                iconWidth={20}
                iconFillColor="#EAB308"
                buttonClassName="h-8"
                StartContentIcon={(props: TButtonIconProps) => (
                  <MovieIcon {...props} />
                )}
                onClickHandler={redirectToHome}
              />
            </NoData>
          )}
        </div>
      );
    }
  };

  return <>{renderContent()}</>;
};

export default WatchList;
