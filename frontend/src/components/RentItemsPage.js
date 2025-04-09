import React from "react";
import RentItems from "./rentitems";

const productList = [
  {
    title: "BOXER BIKE",
    price: 1500,
    rating: 4.7,
    reviews: 22,
    discount: 10,
    image: "/images/rent-bike.webp",
  },
  {
    title: "FULLFACE HELMET",
    price: 500,
    rating: 4.2,
    reviews: 14,
    discount: 5,
    image: "/images/rent-helmet.jpg",
  },
  {
    title: "BIKE JACKET",
    price: 1200,
    rating: 4.5,
    reviews: 31,
    discount: 15,
    image: "/images/rent-jacket.jpg",
  },
  {
    title: "JBL BLUETOOTH SPEAKER",
    price: 1800,
    rating: 4.6,
    reviews: 25,
    discount: 12,
    image: "/images/rent-jbl.jpeg",
  },
  {
    title: "TRAVELLING BAG",
    price: 900,
    rating: 4.0,
    reviews: 17,
    discount: 10,
    image: "/images/rent-travelling bag.jpg",
  },
  {
    title: "WRIST WATCH (ROLEX)",
    price: 2500,
    rating: 4.8,
    reviews: 36,
    discount: 20,
    image: "/images/rent-watch.jpg",
  },
];

const RentItemsPage = () => {
  return (
    <div style={{ padding: "24px", background: "#f2f6ff", minHeight: "100vh" }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "30px",
        color: "#263c91",
        textShadow: "0px 1px 1px rgba(0,0,0,0.1)"
      }}>
        Items for Rent
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "24px"
      }}>
        {productList.map((item, index) => (
          <RentItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RentItemsPage;
