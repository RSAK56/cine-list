"use server";
import { NextResponse } from "next/server";

import { AdapterUser } from "next-auth/adapters";

import { Account, Profile, User } from "next-auth";

import { PrismaClient } from "@prisma/client";

import {
  IFetchedMovieInfo,
  IMovieDetails,
  IMovieList,
} from "@/common/interfaces/movie.interface";

const prisma = new PrismaClient();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// User
export const createUser = async (
  email: string | null | undefined,
  name: string,
  image: string,
) => {
  try {
    // Create new user in the database
    let newUser;
    if (email && name && image) {
      newUser = await prisma.user.create({
        data: {
          email,
          name,
          image,
        },
      });
    }

    if (newUser) {
      // Create an empty watch list for new user
      await prisma.watchList.create({
        data: {
          userId: newUser.id,
          movieIds: "[]",
        },
      });
      return newUser;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occured while creating a new user!" },
      { status: 404 },
    );
  }
};

// Auth
export async function signIn({
  user,
  account,
  profile,
}: {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  email?: { verificationRequest?: boolean | undefined } | undefined;
  credentials?: Record<string, any> | undefined;
}): Promise<boolean> {
  try {
    const email = user?.email;
    const name = user?.name || profile?.name || "";
    const image = user?.image || profile?.image || "";

    // Check if the user already exists in your database
    const existingUser = await prisma.user.findUnique({
      where: { email: email || undefined },
    });

    if (!existingUser) {
      await createUser(email, name, image);
    }

    return true;
  } catch (error) {
    return false;
  }
}

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

      movieIds = movieIds?.filter((id: number) => id !== movieId);

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
      throw new Error(`Failed to fetch watchlist: ${error}`);
    }
  }

  return { results };
};

// Movie
export const fetchMovieDetails = async ({
  movieId,
}: {
  movieId: string | string[] | undefined;
}): Promise<IFetchedMovieInfo> => {
  try {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

    // Fetch the movie info
    const fetchedMovieInfo = await fetch(apiUrl);
    const movieInfoJSON: IFetchedMovieInfo = await fetchedMovieInfo.json();
    return movieInfoJSON;
  } catch (error) {
    throw new Error(`Failed to fetch movie: ${error}`);
  }
};
