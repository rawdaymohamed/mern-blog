import { IKImage } from "imagekitio-next";
interface ImageComponentProps {
  src: string; // required
  className?: string; // optional
}
export default function ImageComponent({
  src,
  className,
}: ImageComponentProps) {
  return (
    <IKImage
      path={src}
      width={70}
      height={70}
      alt="mern blog logo"
      className={className}
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
    />
  );
}
