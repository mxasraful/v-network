import React from 'react';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import Opportunities from '../Opportunities/Opportunities';

const Home = () => {
    return (
        <div className='homeSection'>
            <div className="headerAndBannerForBanner">
                <Header />
                <Banner />
            </div>
            <Opportunities />
        </div>
    );
};

export default Home;