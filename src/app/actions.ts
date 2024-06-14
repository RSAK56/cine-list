"use server";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import {
  IMovieDetails,
  IMovieList,
} from "@/common/interfaces/Movies.interface";

const prisma = new PrismaClient();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Watchlist
export const addMovieToWatchlist = async ({
  email,
  movieId,
}: {
  email: string;
  movieId: number;
}) => {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return false;
    }

    // Fetch the existing watchlist
    let watchList = await prisma.watchList.findUnique({
      where: { userId: user.id },
    });

    if (watchList) {
      // Deserialize movieIds from JSON string to array
      let movieIds = JSON.parse(watchList.movieIds);

      // Check if the newMovieId already exists in the array
      if (!movieIds.includes(movieId)) {
        // Add new movie ID
        movieIds.push(movieId);

        // Update the watchlist with the new movie ID
        watchList = await prisma.watchList.update({
          where: { userId: user.id },
          data: { movieIds: JSON.stringify(movieIds) },
        });
        return true;
      } else {
        return false;
      }
    } else {
      // Create new watchlist entry
      watchList = await prisma.watchList.create({
        data: {
          userId: user.id,
          movieIds: JSON.stringify([movieId]),
        },
      });
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const getWatchList = async ({
  email,
}: {
  email: string | null | undefined;
}) => {
  try {
    if (!email) {
      return NextResponse.json(
        { message: "User email not provided" },
        { status: 400 },
      );
    }

    // Example: Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Example: Fetch the user's watchlist
    const watchList = await prisma.watchList.findUnique({
      where: { userId: user.id },
      select: { movieIds: true },
    });

    if (watchList) {
      const movieIds = JSON.parse(watchList.movieIds);
      return movieIds;
    } else {
      return [];
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occured while fetching watchlist!" },
      { status: 404 },
    );
  }
};

export const removeMovieFromWatchlist = async ({
  email,
  movieId,
}: {
  email: string;
  movieId: number;
}) => {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return false;
    }

    let watchList = await prisma.watchList.findUnique({
      where: { userId: user?.id },
    });

    if (watchList) {
      let movieIds = JSON.parse(watchList.movieIds);

      movieIds = movieIds.filter((id: any) => id !== movieId);

      watchList = await prisma.watchList.update({
        where: { userId: user?.id },
        data: { movieIds: JSON.stringify(movieIds) },
      });

      return true;
    }
    return false;
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occured while removing from watchlist!" },
      { status: 404 },
    );
  }
};

export const fetchWatchListMoviesData = async ({
  watchListMovieIds,
}: {
  watchListMovieIds: number[];
}): Promise<IMovieList> => {
  const results: IMovieDetails[] = [];

  for (const movieId of watchListMovieIds) {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch movie info`);
      }

      const movieInfoJSON: IMovieDetails = await response.json();

      results.push(movieInfoJSON);
    } catch (error) {
      console.error(`Failed to fetch movie info for ID ${movieId}:`, error);
    }
  }

  return { results };
};
