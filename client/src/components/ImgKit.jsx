import { Image } from "@imagekit/react";

const ImageKit = ({ src, className, w, h, alt }) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      alt={alt}
      loading="lazy"
      lgip={{ active: true, quality: 20 }}
      className={className}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
};

export default ImageKit;
