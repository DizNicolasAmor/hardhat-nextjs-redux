import React from 'react';
import Title from '../components/Title';
import NetworkSection from '../components/NetworkSection';
import TokenSection from '../components/TokenSection';

const Home = () => {
  return (
    <div className="text-center">
      <Title />
      <NetworkSection />
      <TokenSection />
    </div>
  );
};

export default Home;
