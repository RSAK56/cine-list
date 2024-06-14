import MovieList from "@/components/movie/MovieList";
import { IMovieList } from "@/common/interfaces/movie.interface";
import NoData from "@/components/fallbacks/NoData";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface HomeProps {
  searchParams: {
    category?: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const category = searchParams.category || "trending";
  const apiUrl = `https://api.themoviedb.org/3${
    category === "trending" ? "/trending/all/week" : "/movie/top_rated"
  }?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  const fetchMovies = await fetch(apiUrl, { next: { revalidate: 360000 } });

  if (!fetchMovies.ok) {
    throw new Error(
      `Could not fetch movies. HTTP status: ${fetchMovies.status}`,
    );
  }

  let fetchedMoviesJSON: IMovieList = await fetchMovies.json();

  return (
    <>
      {fetchedMoviesJSON?.results?.length ? (
        <div className="sm:mt-20">
          <MovieList movieList={fetchedMoviesJSON} />
        </div>
      ) : (
        <div className="flex justify-center mt-80">
          <NoData
            containerClassNames="flex flex-col items-center"
            title="No Movies Found!"
            message="Come back later"
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
      )}
    </>
  );
};

export default Home;
