import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
// This is going to gives us the information whether we've light mode or datk mode turned on
import { useTheme } from 'next-themes';
// Next JS optimized version of img tag
import Image from 'next/image';
import Link from 'next/link';

// Imort assets folder
import images from '../assets';
import { Button } from '.';

// Code Snippet
const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    // Makes code more readable
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  // Know if this is a mobile menu
  // Pass props to our menu items
  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      } `}
    >
      {/* Check if item is active */}
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 transition-all ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

// We can reuse components for our navigation component as well
const ButtonGroup = ({ setActive, router }) => {
  // Later on we will get real information from Meta Mask Wallet
  // Button to connect to a real Meta Mast Wallet or Solidity Address or a Etherium

  // Hard Coded
  const hasConnected = true;
  // It have two different states

  // Note: If the Button is connected then create an NFT
  // If we want to create NFT we're going to setActive('') because we're not going to be to major pages. We wanna be on Create NFT Page
  // Custom button
  // Pass props to real button
  // If we're not connected we cannot create nts and vice versa
  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        console.log('Handle click');
        // Navigate programmatically
        router.push('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {}}
    />
  );
};

const Navbar = () => {
  // Your UI will need to know the current theme and be able to change it. The useTheme hook provides theme information:

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);

  // The theme is set to system now which is light during the day and dark during night
  // We can also manually switch this
  console.log({ theme });

  return (
    <nav className="flex items-center w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          {/* On medium devices it's hidden 990<= Tablet and Mobile */}
          {/* Note: On mobile we only have logo on small and medium devices */}
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
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
        </Link>
        {/* Logo on Small and Medium Devices */}
        <Link href="/">
          {/* @media (max-width: 990px) {
    .md\:flex {
        display: flex;
    }
} */}
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          {/* Toggle Button for dark and light theme */}
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label cursor-pointer"
          >
            <i className="fa fa-sun" />
            <i className="fa fa-moon" />

            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        {/* Menu Items */}
        {/* Display on larger devices */}
        {/* isMobile is not going to be sent */}
        <div className="md:hidden flex">
          {/* Custom Component */}
          {/* Pass props */}
          <MenuItems active={active} setActive={setActive} />
          {/* Buttons */}
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      {/* Serve the purpose as mobile navigation */}
      {/* Usually hidden and on small devices shown */}
      {/* State if mobile nav is open or not */}
      {/* Menu and cross icons */}
      {/* Invert the color of icon based on theme */}
      <div className="hidden md:flex ml-2 cursor-pointer">
        {isOpen ? (
          <Image
            src={images.cross}
            width={25}
            height={25}
            style={{ objectFit: 'contain' }}
            alt="close"
            onClick={() => setIsOpen(false)}
            className={theme === 'light' && 'filter invert'}
          />
        ) : (
          <Image
            src={images.menu}
            width={25}
            height={25}
            style={{ objectFit: 'contain' }}
            alt="menu"
            onClick={() => setIsOpen(true)}
            className={theme === 'light' && 'filter invert'}
          />
        )}

        {/* Show content on mobile screen */}
        {/* Magical part of React reusable component */}
        {/* Apply styles to position it similar */}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex flex-col">
            <div className="flex-1 p-4">
              <MenuItems isMobile active={active} setActive={setActive} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 text-center">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
