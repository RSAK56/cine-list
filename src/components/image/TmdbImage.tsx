import Image from "next/image";

const TmdbImage = ({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/original/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default TmdbImage;
