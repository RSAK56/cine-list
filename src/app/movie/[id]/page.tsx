"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { toast } from "react-hot-toast";

import {
  IFetchedMovieInfo,
  IProductionCompany,
} from "@/common/interfaces/movie.interface";

import { fetchMovieDetails, getWatchList } from "@/app/actions";

import NoData from "@/components/fallbacks/NoData";
import MoviePoster from "@/components/movie/MoviePoster";
import MovieDetailsInfo from "@/components/movie/MovieDetailsInfo";
import MovieProductionDetails from "@/components/movie/MovieProductionDetails";
import CustomLoader from "@/components/loader/Loader";

const MovieDetails = () => {
  const { data: session } = useSession();
  const { id: movieId }: { id: string } = useParams();

  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState<IFetchedMovieInfo | null>(null);
  const [movieExistsInWatchList, setMovieExistsInWatchList] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const email = session?.user?.email;

      // Fetch watch list if user is logged in
      let emailPromise = email ? getWatchList({ email }) : Promise.resolve([]);
      let movieInfoPromise = fetchMovieDetails({ movieId });

      Promise.all([emailPromise, movieInfoPromise])
        .then(([watchList, movieInfoJSON]) => {
          const watchListIds = Array.isArray(watchList) ? watchList : [];
          setMovieInfo(movieInfoJSON);
          const movieInWatchList = watchListIds.includes(
            JSON.parse(movieId) || 0,
          );
          setMovieExistsInWatchList(movieInWatchList);
        })
        .catch((error) => {
          toast.error(`Error fetching data: ${error}`);
        })
        .finally(() => setLoading(false));
    };

    fetchData();
  }, [session, movieId]);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
      {!movieInfo?.status ? (
        <div className="flex justify-center mt-80">
          <NoData
            containerClassNames="flex flex-col items-center"
            title="Movie Has Broken Details!"
            message="Watch this movie later"
            titleClassName="font-bold text-xl"
            messageClassName="font-semibold text-lg"
            childImageContainerClassName="flex flex-row justify-center items-center gap-2"
            showImage={true}
            imageURL="/png/popcorn-stop.png"
            imageWidth={120}
            imageHeight={120}
            altText="no-data-image"
          >
            <></>
          </NoData>
        </div>
      ) : (
        <div>
          <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
            <MoviePoster
              posterPath={movieInfo.backdrop_path || movieInfo.poster_path}
            />
            <MovieDetailsInfo
              session={session}
              movieInfo={movieInfo}
              movieExistsInWatchList={movieExistsInWatchList}
              setMovieExistsInWatchList={setMovieExistsInWatchList}
            />
          </div>
          <div className="p-4 my-4 max-w-6xl mx-auto">
            {movieInfo.production_companies?.length ? (
              <div className="flex sm:justify-center md:justify-start">
                <p className="text-xl font-bold">Production Companies</p>
              </div>
            ) : null}
            <div className="my-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {movieInfo.production_companies?.map(
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
      )}
    </>
  );
};

export default MovieDetails;
