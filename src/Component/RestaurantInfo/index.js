import React, {useEffect} from "react";
import css from "./restInfo.module.css";
import Button from "../Button";
import Header from "../Header";
import { Link } from "react-router-dom";
import {BACKEND_URL_Restaurants} from "../../libs/config";

function RestaurantInfo({restaurant, dispatch, id, newRec, cuisine}) {
  const website = `https://${restaurant.websiteURL}`;

  useEffect(() => {
    async function getRestaurants() {
      let response = await fetch(`${BACKEND_URL_Restaurants}?cuisine=${cuisine}`);
      let data = await response.json();
      dispatch({ type: "REST", payload: data[id]});
    }
    getRestaurants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cuisine]);


  return (
    <>
      <Header />

      <div className={css.container}>
        <h1 className={css.restName}>{restaurant.restaurantName}</h1>
        <img
          className={css.img}
          src={restaurant.photoURL}
          alt="restaurant"
          height="600px"
        />

        <ul className={css.restDetails}>
          <li>Opening Time: {restaurant.openingTimes}</li>
          <li>Closing Time: {restaurant.closingTimes}</li>
          <li>Phone Number: {restaurant.phoneNumber}</li>
          <li>Address: {restaurant.addressLine1}</li>
          <li>{restaurant.area}</li>
          <li>{restaurant.postcode}</li>
        </ul>

        <div className={css.buttons}>
          <Link
            to={{
              pathname: "/bookings",
              state: { id: restaurant.id, restaurant: restaurant },
            }}
          >
            <Button
              text="Book"
              handleClick={() => {
                console.log("when clicking on book " + restaurant.id);
              }}
            />
          </Link>
          <Button text="Next" handleClick={newRec} />
        </div>
      </div>
      <div className={css.extraDetails}>
        <p className={css.description}> {restaurant.description}</p>
        <a
          href={website}
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: "#3d7ea6" }}
        >
          Click here to go to Restaurant website
        </a>
      </div>
    </>
  );
}

export default RestaurantInfo;
