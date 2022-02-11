import {Link, Route, Routes } from 'react-router-dom';
import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import TeamsList from "./components/list-teams";
import TeamSquad from "./components/single-team";
import Player from "./components/single-player";
import HamburgerMenu from "./components/navbar";
import './App.css';
import "./v4.css";
import "./player.css";
import logo from './logo.png'

class App extends Component {
  render() {
    return (
      <>
      
        <HamburgerMenu />
        <div className="pages">
        <div className="header">
          <img src={logo}/>
        </div>
          <Routes>
            <Route path="/" element={<TeamsList />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/squad/:id"  element={<TeamSquad />} />
            <Route path="/player/:id"  element={<Player />} />
          </Routes>
        </div>
       
    </>
    );
  }
}

export default App;
