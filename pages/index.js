import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// import Banner from '../components/Banner';
// import CreatorCard from '../components/CreatorCard';
import { Banner, CreatorCard, NFTCard } from '../components';

import images from '../assets';
import { makeId } from '../utils/makeId';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(true);
  console.log('Banner');
  const { theme } = useTheme();
  // Initialize ref
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  // The Element.scrollLeft property gets or sets the number of pixels that an element's content is scrolled from its left edge.
  const handleScroll = (direction) => {
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    // The offsetWidth property returns the viewable width of an element (in pixels) including padding, border and scrollbar, but not the margin.
    // The Element.scrollWidth read-only property is a measurement of the width of an element's content, including content not visible on the screen due to overflow.
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  console.log(makeId(3));
  return (
    <div className="flex justify-start sm:px-4 pb-12 px-12 pt-20">
      <div className="w-full">
        {/* Main Banner */}
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        {/* Best Sellers or Creators */}
        <div className="pt-10">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Sellers
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            {/*  */}
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {/* Map over creators */}
              {/* Demo creators */}
              {/* The creator name is a block chain address */}
              {/* We can also specify the amount of Etherium that this seller is currently selling
               */}
              {/* Start from higher one and decrease because top sellers have more */}
              {/* 10 8 6 4 */}
              {/* Demo creator data */}
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  {/* Left arrow */}
                  <div
                    onClick={() => {
                      handleScroll('left');
                    }}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer"
                  >
                    <Image
                      src={images.left}
                      Layout="fill"
                      objectFit="contain"
                      alt="left-arrow"
                      className={theme === 'light' && 'filter invert'}
                    />
                  </div>
                  {/* Right arrow */}
                  <div
                    onClick={() => {
                      handleScroll('right');
                    }}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer"
                  >
                    <Image
                      src={images.right}
                      Layout="fill"
                      objectFit="contain"
                      alt="left-arrow"
                      className={theme === 'light' && 'filter invert'}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Hot Bids */}
        <div className="mt-10 flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
          {/* Heading */}
          <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
            Top Bids
          </h1>
          {/* Searchbar */}
          {/* Searching or Filtering through the NFTS and not the entire page */}
          {/* Filter tag */}
          {/* Reuse component in Hot Bids and My NFTS on Profile Page */}
          <div>Searhbar</div>
        </div>
        {/* Bids Cards */}
        <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
          {/* Map over NFTS */}
          {/* Create NFTCard */}
          {/* Later on owner and creator name will be dynamic */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <NFTCard
              key={`nft-${i}`}
              nft={{
                i,
                name: `Nifty NFT ${i}`,
                price: (10 - i * 0.534).toFixed(2),
                seller: `0x${makeId(3)}...${makeId(4)}`,
                owner: `0x${makeId(3)}...${makeId(4)}`,
                description: 'Cool NFT on Sale',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
