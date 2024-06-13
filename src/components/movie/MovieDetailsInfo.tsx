import { Button } from "@nextui-org/react";

import Slider from "../rating-meter/Slider";
import { HeartIcon } from "@/components/icons/heart/Heart";
import { AddToWatchListIcon } from "@/components/icons/add-to-watchlist/AddToWatchListIcon";

import {
  IFetchedMovieInfo,
  IGenre,
} from "@/common/interfaces/Movies.interface";

import { formatRuntime } from "@/utils/helpers";

const MovieDetailsInfo = ({
  movieInfo,
  session,
}: {
  movieInfo: IFetchedMovieInfo;
  session: any;
}) => (
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
        <div>
          {(session?.user && (
            <Button
              color="danger"
              variant="bordered"
              className="h-8"
              startContent={
                <AddToWatchListIcon
                  height={20}
                  width={20}
                  fillColor="#EAB308"
                />
              }
            >
              Add To Watch List
            </Button>
          )) || <></>}
        </div>
      </div>
    </div>
    <div className="my-4">
      <p className="text-xl font-bold">Plot Summary</p>
      <p>{movieInfo?.overview}</p>
    </div>
  </div>
);

export default MovieDetailsInfo;
