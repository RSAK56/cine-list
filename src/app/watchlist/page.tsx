"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { IMovieList } from "@/common/interfaces/movie.interface";
import NoData from "@/components/fallbacks/NoData";
import MovieList from "@/components/movie/MovieList";
import CustomLoader from "@/components/loader/Loader";
import { MovieIcon } from "@/components/icons/movie/MovieIcon";
import CustomIconButton from "@/components/button/CustomIconButton";
import { TButtonIconProps } from "@/common/types/button.types";
import { getWatchList, fetchWatchListMoviesData } from "@/app/actions";

const WatchList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [movieList, setMovieList] = useState<IMovieList | null>(null);
  const [isWatchListLoading, setIsWatchListLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      if (session?.user?.email) {
        getWatchList({ email: session.user.email })
          .then((watchListMovieIds: number[]) =>
            fetchWatchListMoviesData({ watchListMovieIds }),
          )
          .then((fetchedMovieList: IMovieList) => {
            setMovieList(fetchedMovieList);
            setIsWatchListLoading(false);
          })
          .catch((error) => {
            setIsWatchListLoading(false);
            toast.error(`Unable to fetch watchlist`);
          });
      }
    };

    fetchData();
  }, [session]);

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <>
      {isWatchListLoading ? (
        <CustomLoader />
      ) : movieList?.results?.length ? (
        <div className="sm:mt-20">
          <MovieList movieList={movieList} />
        </div>
      ) : !isWatchListLoading && !movieList?.results?.length ? (
        <div className="flex justify-center mt-80">
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default WatchList;
