// Interface for Movie Details
export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  original_name?: string;
  name?: string;
  first_air_date?: string;
}

// Interface for MoviesList
export interface IMovieList {
  results: IMovieDetails[];
}

// Interface for BelongsToCollection
export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// Interface for Genre
export interface IGenre {
  id: number;
  name: string;
}

// Interface for ProductionCompany
export interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Interface for ProductionCountry
export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Interface for SpokenLanguage
export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Interface for no movie data response
export interface INoMovieDataFetchedResponse {
  success: boolean;
  staus_code: number;
  status_message: string;
}

// Interface for the main fetched movie info JSON structure
export interface IFetchedMovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date?: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
}
