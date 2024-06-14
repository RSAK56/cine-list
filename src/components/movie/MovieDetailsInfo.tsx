"use client";
import { Session } from "next-auth";

import { Dispatch, SetStateAction, useState } from "react";

import { toast } from "react-hot-toast";

import { formatRuntime } from "@/utils/helpers";

import { addMovieToWatchlist, removeMovieFromWatchlist } from "@/app/actions";

import { TButtonIconProps } from "@/common/types/button.types";

import CustomIconButton from "../button/CustomIconButton";
import { RemoveStar } from "../icons/star/RemoveStar";

import { AddStar } from "@/components/icons/star/AddStar";
import { HeartIcon } from "@/components/icons/heart/Heart";
import { IFetchedMovieInfo, IGenre } from "@/common/interfaces/movie.interface";
import CustomCircularProgressBar from "../progressbar/CustomCircularProgressBar";

const MovieDetailsInfo = ({
  session,
  movieInfo,
  movieExistsInWatchList,
  setMovieExistsInWatchList,
}: {
  session: Session | null;
  movieInfo: IFetchedMovieInfo;
  movieExistsInWatchList: boolean;
  setMovieExistsInWatchList: Dispatch<SetStateAction<boolean>>;
}) => {
  const email = session?.user?.email;
  const movieId = movieInfo?.id;

  const handleWatchlistChange = async (action: "add" | "remove") => {
    if (email && movieId) {
      const res =
        action === "add"
          ? await addMovieToWatchlist({ email, movieId })
          : await removeMovieFromWatchlist({ email, movieId });

      if (res) {
        setMovieExistsInWatchList(action === "add");
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
    const buttonText = movieExistsInWatchList
      ? "Remove From Watchlist"
      : "Add To Watchlist";
    const handleClick = () =>
      handleWatchlistChange(movieExistsInWatchList ? "remove" : "add");
    return (
      <CustomIconButton
        color="danger"
        variant="bordered"
        text={buttonText}
        iconHeight={20}
        iconWidth={20}
        iconFillColor="#EAB308"
        buttonClassName="h-8"
        StartContentIcon={(props: TButtonIconProps) =>
          movieExistsInWatchList ? (
            <RemoveStar {...props} />
          ) : (
            <AddStar {...props} />
          )
        }
        onClickHandler={handleClick}
      />
    );
  };

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2 justify-start items-center mb-3">
        <h1 className="text-xl font-bold">
          {movieInfo?.title || movieInfo?.name}
        </h1>
        <div>
          <CustomCircularProgressBar rating={movieInfo?.vote_average} />
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
