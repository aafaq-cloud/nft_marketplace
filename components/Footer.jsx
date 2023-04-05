import React from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import images from '../assets';

import { Button } from '.';

const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 justify-start items-start">
    <h3 className="font-poppins font-semibold dark:text-white text-nft-black-1 mb-6">
      {heading}
    </h3>
    {items.map((item, index) => (
      <p
        key={index}
        className="font-poppins dark:text-white text-nft-black-1 font-normal text-base dark:hover:text-nft-gray-1 hover:text-black-1 my-3 cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  // This gives us the variable that says if we're on light or dark mode
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:my-8 py-16">
      {/* Upper Part */}
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        {/* First Column */}
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
              alt="logo"
            />
            {/* On dark mode text is white and usually black */}
            <p
              className="dark:text-white text-nft-black font-semibold text-lg ml-1
            "
            >
              CryptoKet
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 rounded-lg">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 px-4 rounded-md text-nft-black-1 font-normal dark:text-white minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button btnName="Email me" classStyles="rounded-md" />
            </div>
          </div>
        </div>
        {/* Second Column */}
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 mdLml-0 md:mt-8">
          {/* Custom Components */}
          <FooterLinks
            heading="CryptoKet"
            items={['Explore', 'How it Works', 'Contact Us']}
          />
        </div>

        {/* Third Column */}
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 mdLml-0 md:mt-8">
          {/* Custom Components */}
          <FooterLinks
            heading="Support"
            items={[
              'Help Center',
              'Terms of Services',
              'Legal',
              'Privacy Policy',
            ]}
          />
        </div>
      </div>
      {/* Lower Part */}
      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        {/* 4/5 --> 80% width min-width: 1700px */}
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
            CryptoKet, All Rights Reserved.
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((image, i) => (
              <div className="mx-2 cursor-pointer" key={i}>
                <Image
                  src={image}
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain' }}
                  alt="social"
                  className={theme === 'light' && 'filter invert'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
