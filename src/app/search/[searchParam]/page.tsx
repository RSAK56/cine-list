import { fetchMoviesBySearchParams } from "@/app/actions";

import { IMovieList } from "@/common/interfaces/movie.interface";
import { IServerSideProps } from "@/common/interfaces/server-side-prop.interface";

import NoData from "@/components/fallbacks/NoData";
import MovieList from "@/components/movie/MovieList";

const SearchResults = async ({ params }: IServerSideProps) => {
  const searchParams = params.searchParam;
  const searchResultsJSON: IMovieList = await fetchMoviesBySearchParams({
    searchParams,
  });

  return (
    <div className="sm:mt-20">
      {searchResultsJSON?.results?.length ? (
        <MovieList movieList={searchResultsJSON} />
      ) : (
        <div className="flex justify-center mt-80">
          <NoData
            containerClassNames="flex flex-col items-center"
            title="No Movies Found!"
            message="Try searching for other movies"
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
    </div>
  );
};

export default SearchResults;
