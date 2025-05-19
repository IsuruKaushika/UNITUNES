import React from 'react';
import './Ad.css';

// Import images from assets
import hostelAd1 from './../../assets/naththal.jpeg';
import foodDelivery from './../../assets/jam.jpeg';
import taxiService from './../../assets/Wood.png';
import rentalItems from './../../assets/12.jpeg';

// Sample ad data using imported images
const adData = [
  {
    id: 1,
    image: hostelAd1,
    link: 'https://example.com/ad1',
    title: 'Hostel near University - Starting Rs. 5000',
  },
  {
    id: 2,
    image: foodDelivery,
    link: 'https://example.com/ad2',
    title: 'Order Homemade Meals for Students',
  },
  {
    id: 3,
    image: taxiService,
    link: 'https://example.com/ad3',
    title: 'Discount Taxi Services for Campus Rides',
  },
  {
    id: 4,
    image: rentalItems,
    link: 'https://example.com/ad4',
    title: 'Rent Shoes, Bags, Blazers for Events',
  },
];

const Ad = () => {
  return (
    <div className="ad-section">
      <div className="ad-banner">
        <h2>🎓 University Ads & Updates</h2>
        <p>Get the latest info on boarding, services, and events near you!</p>
      </div>

      <div className="ad-carousel">
        <div className="ad-track">
          {adData.map((ad) => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ad-item"
              title={ad.title}
            >
              <img src={ad.image} alt={ad.title} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ad;
