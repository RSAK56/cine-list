import { IProductionCompany } from "@/common/interfaces/movie.interface";

import TmdbImage from "../image/TmdbImage";

const MovieProductionDetails = ({
  productionCompany,
}: {
  productionCompany: IProductionCompany;
}) => (
  <div className="flex flex-row items-center justify-center">
    {productionCompany?.logo_path ? (
      <TmdbImage
        src={productionCompany?.logo_path}
        alt={productionCompany?.name || "production company logo"}
        width={50}
        height={50}
      />
    ) : (
      <p className="font-semibold">{productionCompany?.name}</p>
    )}
  </div>
);

export default MovieProductionDetails;
