"use client";
import { Session } from "next-auth";

import { Button } from "@nextui-org/react";

import { toast } from "react-hot-toast";

import Slider from "../rating-meter/Slider";

import { HeartIcon } from "@/components/icons/heart/Heart";
import { AddToWatchListIcon } from "@/components/icons/add-to-watchlist/AddToWatchListIcon";

import {
  IFetchedMovieInfo,
  IGenre,
} from "@/common/interfaces/Movies.interface";

import { formatRuntime } from "@/utils/helpers";

import { addMovieToWatchlist, removeMovieFromWatchlist } from "@/app/actions";

const MovieDetailsInfo = ({
  session,
  movieInfo,
  movieExistsInWatchList,
}: {
  session: Session | null;
  movieInfo: IFetchedMovieInfo;
  movieExistsInWatchList: boolean;
}) => {
  const email = session?.user?.email;
  const movieId = movieInfo?.id;

  const handleAddMovieToWatchList = async () => {
    if (email && movieId) {
      const res = await addMovieToWatchlist({ email, movieId });
      toast.success(
        res ? "Movie added to watchlist" : "Movie already added to watchlist",
      );
    }
  };

  const handleRemoveMovieFromWatchList = async () => {
    if (email && movieId) {
      const res = await removeMovieFromWatchlist({ email, movieId });
      toast.success(
        res
          ? "Movie removed from watchlist"
          : "Unable to remove movie from watchlist",
      );
    }
  };

  const addToWatchlistButton = () => {
    if (!movieExistsInWatchList) {
      return (
        <Button
          color="danger"
          variant="bordered"
          className="h-8"
          startContent={
            <AddToWatchListIcon height={20} width={20} fillColor="#EAB308" />
          }
          onClick={handleAddMovieToWatchList}
        >
          Add To Watchlist
        </Button>
      );
    }

    if (movieExistsInWatchList) {
      return (
        <Button
          color="danger"
          variant="bordered"
          className="h-8"
          startContent={
            <AddToWatchListIcon height={20} width={20} fillColor="#EAB308" />
          }
          onClick={handleRemoveMovieFromWatchList}
        >
          Remove From Watchlist
        </Button>
      );
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2 justify-start items-center mb-3">
        <h1 className="text-xl font-bold">
          {movieInfo?.title || movieInfo?.name}
        </h1>
        <div className="">
          <Slider rating={movieInfo?.vote_average} clockwise={true} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <div>
          <p className="font-bold">
            {movieInfo?.release_date || movieInfo?.first_air_date}
          </p>
        </div>
        <div className="flex">
          {movieInfo?.genres?.map((genre: IGenre, index: number) => (
            <div key={index}>
              <span className="font-bold text-red-600">{genre?.name}</span>
              {index < movieInfo?.genres?.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </div>
          )) || " "}
        </div>
        <div className="font-semibold">
          Duration: {formatRuntime(movieInfo?.runtime)}
        </div>
        <div className="mt-2 flex flex-row justify-center items-center gap-4">
          <div className="flex justify-center items-center">
            <HeartIcon height={30} width={30} fillColor="red" />
            <p className="font-semibold">{movieInfo?.vote_count}</p>
          </div>
          <div>{session?.user && addToWatchlistButton()}</div>
        </div>
      </div>
      <div className="my-4">
        <p className="text-xl font-bold">Plot Summary</p>
        <p>{movieInfo?.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailsInfo;
