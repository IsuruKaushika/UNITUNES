import React from "react";
import productList from "./ProductList";
import RentItems from "./RentItems";
import "./Styles/RentItemsPage.css";

function RentItemsPage() {
  return (
    <div className="rent-page">
      <h2>Available Rent Items</h2>
      <div className="rent-list">
        {productList.map((item) => (
          <RentItems key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default RentItemsPage;
