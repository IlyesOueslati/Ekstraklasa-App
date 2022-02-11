import React, { Component } from "react";
import FootballService from "../services/football.service";
import {useParams } from 'react-router-dom';
import {Link, NavLink } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
  
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };



class TeamSquad extends Component {
  constructor(props) {
    super(props);
    this.retrieveSquad = this.retrieveSquad.bind(this);
    

    this.state = {
        team_data: {},
        players : [],
        finances:{}
    };
  }
  
  componentDidMount() {
    this.retrieveSquad(this.props.params.id);
  }

  retrieveSquad(id) {
    FootballService.getTeamById(id)
      .then(response => {
        this.setState({
            team_data: response.data.team,
            players: response.data.players,
            finances: response.data.team.finances
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
	

    const {team_data, players, finances} = this.state;

    
    return (
      <>
      
      <div className="container">
        <div className="topstory">
		<div className="technical module" id="technicalModule">
			<div className="clublogo"><img  alt={team_data.teamName} title={team_data.teamName} src={"/teams_logos/" + team_data.teamId + ".png"} />
			</div>
			<div className="information-club">
				<div className="name">
					<h1>{team_data.teamName}</h1>
				</div>
				<div className="info-shirt">
					<div className="info">
						<div>
							<span className="intitule">Country</span>{team_data.country}
						</div>
						<div>
							<span className="intitule">Full name</span>{team_data.teamName}
						</div>
						<div>
							<span className="intitule">Squad size</span>{players.length} Player(s)
						</div>
						<div>
							<span className="intitule">Balance </span>{finances.balance_k_euro}K €
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div className="topstory">
		<div className="club_roster spy" id="clubRoster">
			<div id="roster_details_1">
				<div className="row-flexcolumns">
				{players &&
				players.map((player, index) => (
					<div key={index} className="card-player module">
						<div className="headband-player">
							<div className="picture">
								<a target="" className="" href="">
									<img loading="lazy" alt={player.player} title={player.player} src={"https://img.fminside.net/facesfm22/"+ player.playerId +".png"}/>
								</a>
							</div>
							<div className="general-info">
								<h3 className="name">
								<Link key={index} className="" to={"/player/" + player.playerId} state={{ id: player.playerId }}>{player.player}</Link>
								</h3>
								<p className="position">{player.positions.join(', ')}</p>
								<p className="country">
									<span title={player.country}  >
									<img loading="lazy" className="real_flag" height="20px" src={"/flags/" + player.country.toLowerCase() + "x48.png"} />
										</span> 
									<a target="" className="" href="">{player.country}</a>
								</p>
								<p className="arrivedAt"><span>Contract End :&nbsp;</span>{(new Date(player.contract.contract_end)).toLocaleDateString()}</p>
							</div>
						</div>
						<div className="caracteristic">
							<table>
								<tbody>
									<tr>
										<td className="intitule"><b>Overall</b></td>
										<td className="info-caract"><b className="overall">{player.Overall}</b></td>
									</tr>
									<tr>
										<td className="intitule">Age</td>
										<td className="info-caract">{player.playerAge} years</td>
									</tr>
									<tr>
										<td className="intitule">Preferred Foot</td>
										<td className="info-caract"><img loading="lazy" className="" height="32px" src={"/" + player.Preferred_Foot + ".png"} /></td>
									</tr>
									<tr>
										<td className="intitule">Height</td>
										<td className="info-caract">{player.height_cm} cm</td>
									</tr>
									<tr>
										<td className="intitule">Weight</td>
										<td className="info-caract">{player.weight_kg} kg</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					))}
				</div>
			</div>
		</div>
	</div>
    </div>
       
    </>
  )
  }
}



export default withRouter(TeamSquad);