import { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Ad from '../../components/ad/Ad'; // Advertisement component
import ExploreMenu from '../../components/exploreMenu/exploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/appDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div className="home-container">
      <Header />

      {/* Advertisement Section */}
      <Ad />

      {/* Menu Selection */}
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* Food / Services Display */}
      <FoodDisplay category={category} />

      {/* App Download CTA */}
      <AppDownload />
    </div>
  );
};

export default Home;
