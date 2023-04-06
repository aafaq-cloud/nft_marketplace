import React, { useState, useMemo, useCallback, useContext } from 'react';

import { useRouter } from 'next/router';
// Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
// We're going to use react dropzone to insert and upload files
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button } from '../components/index';
import images from '../assets';

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  // The onDrop has to be newly declared function and in here we want to upload our file to the ipfs which means to upload image to the blockchain
  // This function is not going to change often so wrap it in a useCallback()
  // useCallback is a hook that will return a memoized version of the callback function that only changes if one of the dependencies has changed. Memoization is a way to cache a result so that it doesn't need to be computed again. This can boost performance.
  // Add dependency for useCallback()
  // Recompute the actaul function return value

  // To summarize, the main difference between useCallback and useMemo is the type of value they return. useCallback returns a memoized callback function, while useMemo returns a memoized value.08-Jan-2023

  const onDrop = useCallback(() => {
    // upload image to the blockchain or ipfs
  }, []);

  // The dropzone hook gives us access to the specific variables
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // Provide some function
    onDrop,
    // Accept every single type of image
    accept: 'image/*',
    maxSize: 5000000,
  });

  // Use the useMemo hook and provide the callback function
  // The useMemo will only recompute the memoized value when one of the deps has changed.
  // The only reason why we're doing this is because we don't want to continuously change the file styles but only change sometimes and we'll see when.
  // Immediately handle events when we want to change the styles
  // Drag and drop file if the file is accepted or rejected then change the styles and we get all of the events using useDropzone
  // Recompute the output of the function
  // We can change the styles having access to the events getRootProps, getInputProps, isDragActive, isDragAccept & isDragReject, belong to the dropzone

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white bordr-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
        ${isDragActive && ' border-file-active'}
        ${isDragAccept && ' border-file-accept'}
        ${isDragReject && ' border-file-reject'}
      `,
    [(isDragActive, isDragAccept, isDragAccept)]
  );

  // On medium devices with is full other 3/5 60%
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            {/* This is going to inject all of the specific props that belongs to React Dropzone to our basic input field and the div */}
            <div
              {...getRootProps()}
              className={fileStyle}
            >
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM Max 100mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  {/* Render an image */}
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  JPG, PNG, GIF, SVG, WEBM Max 100mb.
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or browse media on your device
                </p>
              </div>
            </div>
            {/* Ofcourse we're not going to see this yet because this image is only visible once it's uploaded to the blockchain so then we can read it's uploaded url. We will implement the blockchain smart contract functionality */}
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
