import { IServerSideProps } from "@/common/interfaces/server-side-prop.interface";
import NoData from "@/components/fallbacks/NoData";
import MovieList from "@/components/movie/MovieList";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const SearchResults = async ({ params }: IServerSideProps) => {
  const searchParams = params.searchParam;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchParams}&language=en-US&page=1&include_adult=false`;

  const fetchedSearchResults = await fetch(apiUrl);
  const searchResultsJSON = await fetchedSearchResults.json();

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
