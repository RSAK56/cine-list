"use client";
import { Session } from "next-auth";
import { Button } from "@nextui-org/react";

import { useState } from "react";

import { toast } from "react-hot-toast";

import { formatRuntime } from "@/utils/helpers";

import { addMovieToWatchlist, removeMovieFromWatchlist } from "@/app/actions";

import Slider from "../rating-meter/Slider";
import { HeartIcon } from "@/components/icons/heart/Heart";
import { AddStar } from "@/components/icons/star/AddStar";
import {
  IFetchedMovieInfo,
  IGenre,
} from "@/common/interfaces/Movies.interface";
import { RemoveStar } from "../icons/star/RemoveStar";

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
  const [isMovieInWatchlist, setIsMovieInWatchlist] = useState<boolean>(
    movieExistsInWatchList,
  );

  const handleWatchlistChange = async (action: "add" | "remove") => {
    if (email && movieId) {
      const res =
        action === "add"
          ? await addMovieToWatchlist({ email, movieId })
          : await removeMovieFromWatchlist({ email, movieId });

      if (res) {
        setIsMovieInWatchlist(action === "add");
        toast.success(
          action === "add"
            ? "Movie added to watchlist"
            : "Movie removed from watchlist",
        );
      } else {
        toast.error(
          action === "add"
            ? "Movie already added to watchlist"
            : "Unable to remove movie from watchlist",
        );
      }
    }
  };

  const WatchlistButton = () => {
    const buttonText = isMovieInWatchlist
      ? "Remove From Watchlist"
      : "Add To Watchlist";
    const handleClick = () =>
      handleWatchlistChange(isMovieInWatchlist ? "remove" : "add");
    const icon = isMovieInWatchlist ? (
      <RemoveStar height={20} width={20} fillColor="#EAB308" />
    ) : (
      <AddStar height={20} width={20} fillColor="#EAB308" />
    );
    return (
      <Button
        color="danger"
        variant="bordered"
        className="h-8"
        startContent={icon}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2 justify-start items-center mb-3">
        <h1 className="text-xl font-bold">
          {movieInfo?.title || movieInfo?.name}
        </h1>
        <div>
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
          <div>{session?.user && <WatchlistButton />}</div>
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
