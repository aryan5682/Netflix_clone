
// import './App.css';

import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from './pages/Player';
import Movies from './pages/Movies';
import TvShow from './pages/TvShow';
import UserLiked from './pages/UserLiked';



export default function App() {

  return (
   
    <Router>
       <Routes>
        <Route exact path="/login" element ={<Login/>}/>;
        <Route exact path="/signup" element ={<Signup/>}/>;
        <Route exact path="/player" element={<Player/>}/>
        <Route exact path="/Movies" element={<Movies/>}/>
        <Route exact path="/Tv" element={<TvShow/>}/>
        <Route exact path="/mylist" element={<UserLiked/>}/>
        <Route exact path="/" element={<Netflix/>}/>;
       </Routes>
    </Router>
  )
}



