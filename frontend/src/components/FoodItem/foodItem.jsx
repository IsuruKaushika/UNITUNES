import { useContext } from 'react';
import './foodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, description, price, image }) => {
  // const [itemCount, setItemCount] = useState(0);

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const url = "http://localhost:3000";
  const placeholderImage = 'path/to/placeholder/image.jpg'; // Define a placeholder image

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img
          className='food-item-image'
          src={`${url}/uploads/${image}`}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'path/to/placeholder/image.jpg'; // Replace with a placeholder image
          }}
        />
        {!cartItems[id]
          //  { !  //itemCount
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }




 
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">Rs:{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;