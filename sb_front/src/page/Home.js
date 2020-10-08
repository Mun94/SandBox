import React from 'react';
import ChannelsContainer from '../containers/home/ChannelsContainer.js';
import Header from '../components/common/Header.js';
import SettingContainer from '../containers/home/SettingContainer.js';

const Home = () => {
  return (
    <>
      <Header />
      <SettingContainer />
      <ChannelsContainer />
    </>
  );
};

export default Home;
