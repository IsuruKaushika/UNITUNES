import React from 'react';
import './Ad.css';

// Sample ad data
const adData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/200x100?text=Hostel+Ad+1',
    link: 'https://example.com/ad1',
    title: 'Hostel near University - Starting Rs. 5000',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200x100?text=Food+Delivery',
    link: 'https://example.com/ad2',
    title: 'Order Homemade Meals for Students',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/200x100?text=Taxi+Service',
    link: 'https://example.com/ad3',
    title: 'Discount Taxi Services for Campus Rides',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/200x100?text=Rental+Items',
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
