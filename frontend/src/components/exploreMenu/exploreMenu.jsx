import React from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Your University Toolkit!</h1>
      <p className='explore-menu-text'>
      Explore our smart tools designed to enhance your university experience. Our goal is to simplify your academic journey and provide the best solutions to help you stay organized, connected, and productive! </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;