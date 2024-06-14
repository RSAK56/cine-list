import MovieList from "@/components/movie/MovieList";
import { Pagination } from "@nextui-org/react";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const SearchResults = async ({ params }: any) => {
  const searchParams = params.searchParam;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchParams}&language=en-US&page=1&include_adult=false`;

  const fetchedSearchResults = await fetch(apiUrl);
  const searchResultsJSON = await fetchedSearchResults.json();

  return (
    <div className="sm:mt-20">
      {searchResultsJSON?.length === 0 ? (
        <h1 className="text-center pt-6">No results found</h1>
      ) : null}
      {searchResultsJSON && <MovieList movieList={searchResultsJSON} />}
      <div className="flex justify-center items-center">
        <Pagination color="warning" initialPage={3} total={10} />
      </div>
    </div>
  );
};

export default SearchResults;
