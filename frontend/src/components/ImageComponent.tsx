import { IKImage } from "imagekitio-next";
interface ImageComponentProps {
  src: string; // required
  className?: string; // optional
  width?: number; // optional
  height?: number; // optional
  alt: string; // optional
}
export default function ImageComponent({
  src,
  className = "",
  width,
  height,
  alt,
}: ImageComponentProps) {
  return (
    <IKImage
      path={src}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      className={className}
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
    />
  );
}
