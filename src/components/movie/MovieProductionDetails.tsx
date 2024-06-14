import Image from "next/image";

import { IProductionCompany } from "@/common/interfaces/Movies.interface";

const MovieProductionDetails = ({
  productionCompany,
}: {
  productionCompany: IProductionCompany;
}) => (
  <div className="flex flex-row items-center justify-center">
    {productionCompany?.logo_path ? (
      <Image
        src={`https://image.tmdb.org/t/p/original/${productionCompany.logo_path}`}
        alt={productionCompany.name || "production company logo"}
        width={50}
        height={50}
      />
    ) : (
      <p className="font-semibold">{productionCompany?.name}</p>
    )}
  </div>
);

export default MovieProductionDetails;
