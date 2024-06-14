import { ReactNode } from "react";

import Image from "next/image";

const NoData = ({
  title,
  altText,
  message,
  children,
  imageURL,
  showImage,
  imageWidth,
  imageHeight,
  titleClassName,
  messageClassName,
  containerClassNames,
  childImageContainerClassName,
}: {
  title?: string;
  altText?: string;
  message?: string;
  imageURL?: string;
  children: ReactNode;
  showImage?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  titleClassName?: string;
  messageClassName?: string;
  containerClassNames: string;
  childImageContainerClassName?: string;
}) => {
  return (
    <div className={containerClassNames}>
      <p className={titleClassName}>{title}</p>
      <p className={messageClassName}>{message}</p>
      <div className={childImageContainerClassName}>
        {children}
        {showImage ? (
          <Image
            alt={`${altText}`}
            src={`${imageURL}`}
            width={imageWidth}
            height={imageHeight}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NoData;
