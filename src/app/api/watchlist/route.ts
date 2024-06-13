// app/api/watchlist/route.js

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetWatchlistRequest extends NextRequest {
  query: {
    userEmail?: string;
  };
}

// Add a movie to a user's watchlist
export async function POST(request: {
  json: () =>
    | PromiseLike<{ userEmail: string; newMovieId: string }>
    | { userEmail: string; newMovieId: string };
}) {
  const { userEmail, newMovieId } = await request.json();

  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Fetch the existing watchlist
  let watchList = await prisma.watchList.findUnique({
    where: { userId: user.id },
  });

  if (watchList) {
    // Deserialize movieIds from JSON string to array
    let movieIds = JSON.parse(watchList.movieIds);

    // Check if the newMovieId already exists in the array
    if (!movieIds.includes(newMovieId)) {
      // Add new movie ID
      movieIds.push(newMovieId);

      // Update the watchlist with the new movie ID
      watchList = await prisma.watchList.update({
        where: { userId: user.id },
        data: { movieIds: JSON.stringify(movieIds) },
      });
    } else {
      return NextResponse.json(
        { message: "Movie already in watchlist" },
        { status: 400 },
      );
    }
  } else {
    // Create new watchlist entry
    watchList = await prisma.watchList.create({
      data: {
        userId: user.id,
        movieIds: JSON.stringify([newMovieId]), // Initialize with single movie ID as JSON string
      },
    });
  }

  return NextResponse.json(
    { message: "Movie added to your watchlist!" },
    { status: 200 },
  );
}

// Fetch a user's watchlist
export async function GET(request: GetWatchlistRequest) {
  const userEmail = request.query.userEmail;

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email not provided" },
      { status: 400 },
    );
  }

  // Example: Find the user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Example: Fetch the user's watchlist
  const watchList = await prisma.watchList.findUnique({
    where: { userId: user.id },
    select: { movieIds: true },
  });

  if (watchList) {
    const movieIds = JSON.parse(watchList.movieIds);
    return NextResponse.json(movieIds);
  } else {
    return NextResponse.json([]);
  }
}

// Remove a movie from a user's watchlist
export async function DELETE(request: {
  json: () =>
    | PromiseLike<{ userId: any; movieIdToRemove: any }>
    | { userId: any; movieIdToRemove: any };
}) {
  const { userId, movieIdToRemove } = await request.json();

  let watchList = await prisma.watchList.findUnique({
    where: { userId: userId },
  });

  if (watchList) {
    let movieIds = JSON.parse(watchList.movieIds);
    movieIds = movieIds.filter((id: any) => id !== movieIdToRemove);
    watchList = await prisma.watchList.update({
      where: { userId: userId },
      data: { movieIds: JSON.stringify(movieIds) },
    });
  }

  return NextResponse.json(watchList);
}
