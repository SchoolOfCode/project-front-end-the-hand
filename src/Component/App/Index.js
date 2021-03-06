import './App.css';
import RestaurantInfo from '../RestaurantInfo';
import BookingPage from '../BookingPage';
import ReservationPage from '../ReservationPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import reducer, {INITIAL_REST} from '../../libs/restaurantReducer';
import React, { useReducer, useState } from "react";
import LandingPage from '../LandingPage';
import ConfirmationPage from '../ConfirmationPage';
import AuthButton from "../AuthButton";
import { AuthProvider } from "../../authContext";

function App() {
  const [restaurant, dispatch] = useReducer(reducer, INITIAL_REST);
  const [id, setId] = useState(0);  //this is not the restaurant id, is the index position of the restaurant withing the array containing multiple restaurants of the same cuisine
  const [cuisine, setCuisine] = useState('Italy');

   function newRec() {
    setId(Math.floor(Math.random() * 4));  
    console.log(`Button id is ${id}`);
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ul className="homePage">
            <li>
              <Link to="/">HOME PAGE</Link>
            </li>
        <AuthButton/>
          </ul>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Landing Page</Link>
              </li>
              <li>
                <Link to="/recs">Recommendations</Link>
              </li>
              <li>
                <Link to="/bookings">Booking Page</Link>
              </li>
              <li>
                <Link to="/reservations">Reservations</Link>
              </li>
              <li>
                <Link to="/confirmation">Confirmation</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/bookings">
              <BookingPage id={restaurant.id} restaurant={restaurant} />
            </Route>
            <Route path="/recs">
              <RestaurantInfo
                restaurant={restaurant}
                dispatch={dispatch}
                id={id}
                newRec={newRec}
                cuisine={cuisine}
              />
            </Route>
            <Route path="/reservations">
              <ReservationPage />
            </Route>
            <Route path="/confirmation">
              <ConfirmationPage />
            </Route>
            <Route path="/">
              <LandingPage cuisine={cuisine} setCuisine={setCuisine} />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
  }

export default App;
