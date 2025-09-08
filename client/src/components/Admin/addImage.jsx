import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ImageKit from "imagekit-javascript";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/upload-auth`,
      {
        method: "GET",
        credentials: "include",
      }
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
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const onError = (err) => {
    console.error(err);
    toast.error("Image upload failed!");
    setPreview(null);
  };

  const onSuccess = (res) => {
    console.log(res);
    setData(res);
    // show uploaded link as preview
    setPreview(res.url);
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // show temporary loader icon until upload succeeds
      setPreview("loading");

      try {
        const { signature, expire, token } = await authenticator();

        const imagekit = new ImageKit({
          publicKey: import.meta.env.VITE_IK_PUBLIC_KEY,
          urlEndpoint: import.meta.env.VITE_IK_URL_ENDPOINT,
          authenticationEndpoint: `${
            import.meta.env.VITE_API_URL
          }/api/v1/auth/upload-auth`,
        });

        imagekit.upload(
          {
            file, // File object
            fileName: file.name,
            signature,
            expire,
            token,
            useUniqueFileName: true,
          },
          (err, result) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(result);
            }
          }
        );
      } catch (error) {
        onError(error);
      }

      e.dataTransfer.clearData();
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      {/* Click Upload */}
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />

      {/* Drag & Drop Box */}
      <div
        className={`cursor-pointer rounded-md transition border-2 p-2 flex flex-col items-center justify-center ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-dashed border-gray-400"
        }`}
        onClick={() => ref.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {preview === "loading" ? (
          <div className="w-24 h-24 flex items-center justify-center">
            <span className="text-xs text-gray-400 animate-pulse">
              Uploading...
            </span>
          </div>
        ) : preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        ) : (
          children
        )}
        <p className="text-xs text-gray-400 mt-1">Drag & Drop or Click</p>
      </div>
    </IKContext>
  );
};

export default Upload;
