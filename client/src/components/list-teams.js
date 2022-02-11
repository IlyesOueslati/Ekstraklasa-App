import React, { Component } from "react";
import {Link, NavLink } from 'react-router-dom';
import FootballService from "../services/football.service";

export default class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTeams = this.retrieveTeams.bind(this);


    this.state = {
        teams: []
    };
  }

  componentDidMount() {
    this.retrieveTeams();
  }

  retrieveTeams() {
    FootballService.getTeamsAll()
      .then(response => {
        this.setState({
          teams: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {teams} = this.state;

    return (
      <>
        <h3 className="header">TEAMS</h3>
        <div className="team">
          <ul className="auto-grid" role="list">
            {teams &&
              teams.map((team, index) => (
            <li key={index} >   
          <Link className="profile" to={"/squad/" + team.teamId} state={{ id: team.teamId }}>
          <h2 className="profile__name">{team.teamName}</h2>
          <p>{team.reputation}</p>
          <img alt={team.teamName} src={"teams_logos/" + team.teamId + ".png"} />
          </Link>
          </li>
      
    ))}</ul>
  </div>
  </>
  )
  }
}