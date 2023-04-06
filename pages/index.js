import Banner from '../components/Banner';

const Home = () => (
  <div className="flex justify-start sm:px-4 pb-12 px-12 pt-20">
    <div className="w-full">
      <Banner
        name="Discover, collect, and sell extraordinary NFTs"
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
      />
    </div>
  </div>
);

export default Home;
