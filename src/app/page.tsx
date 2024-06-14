import MovieList from "@/components/movie/MovieList";
import { IMovieList } from "@/common/interfaces/movie.interface";
import NoData from "@/components/fallbacks/NoData";
import { fetchMoviesByCategory } from "./actions";

interface HomeProps {
  searchParams: {
    category?: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const category = searchParams.category || "trending";

  let movieList: IMovieList = await fetchMoviesByCategory({ category });

  return (
    <>
      {movieList?.results?.length ? (
        <div className="sm:mt-20">
          <MovieList movieList={movieList} />
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
