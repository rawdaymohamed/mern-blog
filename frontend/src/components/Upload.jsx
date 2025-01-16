"use client";
import { IKUpload, ImageKitProvider } from "imagekitio-next";

import { useRef } from "react";
import { toast } from "react-toastify";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    } else {
      throw new Error("Authentication request failed: Unknown error occurred.");
    }
  }
};

export const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
    toast.error("Image upload failed");
  };

  const onSuccess = (res) => {
    toast.success("Image uploaded successfully");
    console.log("Success", res);
    setData(res);
  };
  const onUploadProgress = (evt) => {
    setProgress(Math.round((evt.loaded / evt.total) * 100));
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        accept={`${type}/*`}
        ref={ref}
      />
      <div onClick={() => ref.current?.click()}>{children}</div>
    </ImageKitProvider>
  );
};
