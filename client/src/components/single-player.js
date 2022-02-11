import React, { Component } from "react";
import FootballService from "../services/football.service";
import {useParams } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
  
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };



class Player extends Component {
  constructor(props) {
    super(props);
    this.retrievePlayer = this.retrievePlayer.bind(this);
    

    this.state = {
        player: {},
        history : [],
        totalminsPlayed: 0,
        gamePlayed: 0,
        totalWin: 0,
        totalLost: 0
    };
  }
  
  componentDidMount() {
    this.retrievePlayer(this.props.params.id);
  }

  retrievePlayer(id) {
    FootballService.getPlayerById(id)
      .then(response => {
      var totalminsPlayed = 0;
      var playedMatches = 0 ;
      var totalWin = 0; 
      var totalLost = 0; //set a variable that holds our total
      var i;

      for (i = 0; i < response.data.history.length; i++) {  //loop through the array
         if (response.data.history[i].played) {
            totalminsPlayed += response.data.history[i].minsPlayed;
            playedMatches += 1;
            if (response.data.history[i].result == "win")
               totalWin += 1;  //Do the math!
            if (response.data.history[i].result == "lost")
               totalLost += 1;  //Do the math!
         }
      }
        this.setState({
            player: response.data.player,
            history: response.data.history,
            totalminsPlayed: totalminsPlayed,
            gamePlayed: playedMatches,
            totalWin: totalWin,
            totalLost: totalLost
        });
        console.log(response.data.player);
        console.log(response.data.history);

      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (!this.state.player.country) {
        return <div />
    }

   const {player, history, totalminsPlayed, gamePlayed, totalLost, totalWin} = this.state;
   console.log(typeof(player.country));
   var isGK = "";
   if(player.positions.includes("GK"))
      isGK = <div> <div className="title-module">
         <h2>Goalkeeping Skills</h2>
      </div>{Object.entries(player.Goalkeeping).map(([key,value]) => (
      <div className="skill physical">
         <div className="intitule">{key.replaceAll('_',' ')}</div>
         <div className="avgnote">
            <div className="result"><b>{value}</b>/100</div>
         </div>
      </div>
      ))}
      </div>;
         
   return (

    <>
    <div className="container">
   <div className="topstory">
      <div className="player_technical" id="technicalPlayer">
         <div className="contentPlayer">
            <div className="titlePlayer">
               <h1><span className="lastname">{player.player}</span></h1>
               <span className="numberPlayer">{player.Overall}</span>
            </div>
            <div className="club">
               <div className="data">
                  <h2>
                     <div className="clublogo">
                         <img loading="lazy" alt= {"logo"+player.teamName} title={player.teamName} src={"/teams_logos/" + player.teamId + ".png"}/>{player.teamName}</div>
                  </h2>
               </div>
            </div>
            <div className="infoPlayer module">
               <div className="line">
                  <div className="data">
                     <div className="firstline">
                        <span className="title">Age&nbsp;:&nbsp;</span>
                        <span className="age">&nbsp;{player.playerAge} years</span><span></span>&nbsp;
                     </div>
                     <div className="secondline">
                        <span className="title">Nationality &nbsp;:&nbsp;</span>{player.country}&nbsp;<span title={player.country} className="real_flag" >
                            <img loading="lazy" className="real_flag" height="20px" src={"/flags/" + player.country.toLowerCase() + "x48.png"} /></span>
                     </div>
                  </div>
                  <div className="data">
                     <div className="firstline"><span className="title">Height :&nbsp;</span>{player.height_cm} cm</div>
                     <div className="secondline"><span className="title">Weight :&nbsp;</span>{player.weight_kg} kg</div>
                  </div>
                  <div className="data">
                  <div className="firstline"><span className="title">Best foot :&nbsp;</span>{player.Preferred_Foot} foot</div>
                  <div className="secondline"><span className="title">Positions :&nbsp;</span>{player.positions.join(', ')}</div>
                  </div>
               </div>
               <div className="linesecond">
                  <div className="data"><span className="title">Number of international caps :&nbsp;</span>{player.caps} ({player.international_goals} goals)</div>
               </div>
            </div>
         </div>
         <div className="photoPlayer">
            <ul>
               <li className="subphoto mySlides">
                   <img alt={player.player} title={player.player} src={"https://img.fminside.net/facesfm22/"+ player.playerId +".png"}/></li>
            </ul>
         </div>
      </div>
   </div>
   <div className="topstory">
      <div className="module currentseasonstats">
         <div className="title-module">
            <h2>Current season statistics (2021/2022)</h2>
         </div>
         <div className="content">
            <div className="s_impactgoals">
               <span className="number number1">{totalWin}/{gamePlayed}</span>
               <span className="name name1">Win Rate</span>
               <span className="number number2">{totalLost}/{gamePlayed}</span>
               <span className="name name2">Lost Rate</span>
            </div>
            <div className="s_impactgoals">
               <span className="number number3">{gamePlayed}</span>
               <span className="name name3">Played matches</span>
               <span className="number number3">{totalminsPlayed}</span>
               <span className="name name3">Minutes played</span>
            </div>
            <div className="s_played_matches">
               <span className="number number5">{player.market_value_k_euro}K €</span>
               <span className="name name5">Market Value (€)</span>
               
               <span className="number number5">{(new Date(player.contract.contract_end)).toLocaleDateString()}</span>
               <span className="name name5">Contract End</span>
            </div>
         </div>
      </div>
   </div>

   <div className="topstory">
      <div className="row">
         <div className="module skillssummary spy" id="playerNotes">
            <div className="title-module">
               <h2>Technical Skills</h2>
            </div>
            {Object.entries(player.Technical).map(([key,value]) => (
            <div className="skill physical">
               <div className="intitule">{key.replaceAll('_',' ')}</div>
               <div className="avgnote">
                  <div className="result"><b>{value}</b>/100</div>
               </div>
            </div>
            ))}
            {isGK}
         </div>
         <div className="module skillssummary spy" id="playerNotes">
            <div className="title-module">
               <h2>Mental Skills</h2>
            </div>
            {Object.entries(player.Mental).map(([key,value]) => (
            <div className="skill physical">
               <div className="intitule">{key.replaceAll('_',' ')}</div>
               <div className="avgnote">
                  <div className="result"><b>{value}</b>/100</div>
               </div>
            </div>
            ))}
         </div>
         <div className="module skillssummary spy" id="playerNotes">
            <div className="title-module">
               <h2>Physical Skills</h2>
            </div>
            {Object.entries(player.Physical).map(([key,value]) => (
            <div className="skill physical">
               <div className="intitule">{key.replaceAll('_',' ')}</div>
               <div className="avgnote">
                  <div className="result"><b>{value}</b>/100</div>
               </div>
            </div>
            ))}
         </div>
      </div>
   </div>
   
   <div className="topstory">
      <div className="module lastgames spy" id="lastGames">
         <div className="title-module">
            <h2>Last games</h2>
         </div>
         <table>
            <tbody>
               <tr className="header-lastgames sticky">
                  <th className="date">Date</th>
                  <th className="competition">Competition</th>
                  <th className="tour">Round</th>
                  <th className="score">Home Team </th>
                  <th className="score">Score</th>
                  <th className="score">Away Team</th>
                  <th colSpan="2" className="score2">Score</th>
                  <th className="minutes">
                     <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8903 8.1633c-.2237 0-.4194-.0839-.5871-.2516-.3355-.3355-.3355-.8667 0-1.1742l1.4258-1.4258c.3355-.3355.8667-.3355 1.1742 0 .3355.3355.3355.8666 0 1.1742l-1.4258 1.4258c-.1398.1677-.3635.2516-.5871.2516ZM4.1097 8.1633c-.2237 0-.4194-.0839-.5871-.2516L2.0968 6.4859c-.3355-.3355-.3355-.8667 0-1.1742.3354-.3355.8666-.3355 1.1742 0l1.4258 1.4258c.3355.3355.3355.8666 0 1.1742-.1678.1677-.3914.2516-.5871.2516ZM13 4.4731c-.4753 0-.8387-.3634-.8387-.8387V.8387C12.1613.3634 12.5247 0 13 0s.8387.3634.8387.8387v2.7957c0 .4753-.3634.8387-.8387.8387Z" fill="#243F85"></path>
                        <path d="M13 28.7956c6.9481 0 12.5806-5.6326 12.5806-12.5807 0-6.948-5.6325-12.5806-12.5806-12.5806S.4193 9.2668.4193 16.2149 6.052 28.7956 13 28.7956Z" fill="#EAE6EC"></path>
                        <path d="M13 26.0001c5.4041 0 9.785-4.3809 9.785-9.785 0-5.4041-4.3809-9.785-9.785-9.785-5.404 0-9.785 4.3809-9.785 9.785 0 5.4041 4.381 9.785 9.785 9.785Z" fill="#D7D7FF"></path>
                        <path d="M13 26.4193c-5.6193 0-10.2043-4.5849-10.2043-10.2043 0-4.3892 2.7957-8.2752 6.9613-9.673.2237-.084.4473.0558.5312.2515.0839.2237-.0559.4474-.2516.5312-3.8301 1.286-6.4021 4.8645-6.4021 8.8903 0 5.1721 4.1935 9.3656 9.3655 9.3656 1.6775 0 3.3269-.4473 4.7527-1.286.1957-.1118.4473-.0559.5871.1398.1119.1957.0559.4473-.1398.5871a10.3611 10.3611 0 0 1-5.2 1.3978Z" fill="#243F85"></path>
                        <path d="M13 6.4302c5.3957 0 9.7849 4.3892 9.7849 9.7849 0 2.7119-1.0903 5.1441-2.8795 6.9054L13 16.2151v-9.785Z" fill="#fff"></path>
                        <path d="M13 17.6131c.7721 0 1.3979-.6259 1.3979-1.3979 0-.772-.6258-1.3978-1.3979-1.3978-.772 0-1.3978.6258-1.3978 1.3978 0 .772.6258 1.3979 1.3978 1.3979Z" fill="#EAE6EC"></path>
                        <path d="M13 29.2148c-7.157 0-13-5.843-13-13s5.843-13 13-13 13 5.843 13 13-5.843 13-13 13Zm0-25.1612C6.2903 4.0536.8387 9.5052.8387 16.2148c0 6.7097 5.4516 12.1613 12.1613 12.1613 6.7097 0 12.1613-5.4516 12.1613-12.1613 0-6.7096-5.4516-12.1612-12.1613-12.1612Z" fill="#243F85"></path>
                        <path d="M19.9053 23.5398c-.1118 0-.2236-.028-.3075-.1119-.1678-.1677-.1678-.4193 0-.5871 1.7613-1.7612 2.7398-4.1096 2.7398-6.6258 0-5.172-4.1936-9.3655-9.3656-9.3655-.2237 0-.4194-.1958-.4194-.4194 0-.2237.1957-.4194.4194-.4194 5.6193 0 10.2043 4.585 10.2043 10.2043 0 2.7398-1.0624 5.2839-2.9914 7.2129-.0559.0839-.1678.1119-.2796.1119ZM13 15.2367c-.2236 0-.4193-.1957-.4193-.4193V9.226c0-.2237.1957-.4194.4193-.4194.2237 0 .4194.1957.4194.4194v5.5914c0 .2236-.1957.4193-.4194.4193Z" fill="#243F85"></path>
                        <path d="M12.9999 18.0324a1.8136 1.8136 0 0 1-1.8172-1.8172 1.8137 1.8137 0 0 1 1.8172-1.8173 1.8136 1.8136 0 0 1 1.8172 1.8173 1.8136 1.8136 0 0 1-1.8172 1.8172Zm0-2.7957c-.5312 0-.9785.4473-.9785.9785 0 .5311.4473.9784.9785.9784.5312 0 .9785-.4473.9785-.9784 0-.5312-.4473-.9785-.9785-.9785ZM19.9054 23.5397c-.1118 0-.2236-.028-.3075-.1119l-1.985-1.9849c-.1677-.1678-.1677-.4194 0-.5871.1678-.1678.4194-.1678.5871 0l1.985 1.9849c.1677.1678.1677.4194 0 .5871-.0559.0839-.1678.1119-.2796.1119ZM14.6774 1.6774h-3.3549c-.4752 0-.8387-.3634-.8387-.8387S10.8473 0 11.3225 0h3.3549c.4752 0 .8387.3634.8387.8387s-.3635.8387-.8387.8387Z" fill="#243F85"></path>
                        <title>Minutes played</title>
                     </svg>
                  </th>
                  <th className="goals">
                     Result
                  </th>
                  <th className="owngoals">
                     Absence
                  </th>
                  <th className="assists">
                     <svg width="34" height="35" viewBox="0 0 34 35" fill="none">
                        <path d="M23.7357 14.3611a10.173 10.173 0 0 0-7.193 2.9794 10.1725 10.1725 0 1 0 7.193-2.9794Zm0 1.0172c1.7903 0 3.4586.5392 4.8624 1.4343l-.2848.6002h-4.5776l-1.7497-.8545.356-1.0477c.4578-.0814.9156-.1323 1.3937-.1323Zm-2.5126.3866-.3459 1.0477-2.6041 1.3021-1.2716.2543c1.1393-1.2308 2.5838-2.1362 4.2216-2.6041Zm3.5298 2.6652h3.0517l2.7364 3.6519-1.2715 2.6143-2.6754.6307-3.3365-3.9062 1.4953-2.9907Zm-6.9579.6713.8544 3.3976-1.241 3.1128-2.6041.8952c-.1425-.6409-.2238-1.2919-.2238-1.9735 0-1.9327.6001-3.7027 1.6174-5.1777l1.5971-.2544Zm14.6483 2.6042c.295.885.4476 1.8412.4476 2.8279 0 1.4649-.3764 2.8381-.9868 4.069h-1.0477l-.8545-3.3976 1.5259-3.0517.9155-.4476Zm-12.7766.7934h3.0517l2.8585 3.3366-1.8412 2.7669-3.2145.7935-2.3499-3.1433 1.4954-3.7537Zm4.069 7.1207 3.0517 2.0345-.885 1.7497c-.7019.1628-1.4242.2848-2.1667.2848-1.7802 0-3.4282-.5086-4.832-1.3936l1.1801-1.7497 3.6519-.9257Zm7.1207 0h.5086c-1.0173 1.5259-2.5431 2.7161-4.2623 3.3976l.7019-1.3631 3.0518-2.0345Z" fill="#000"></path>
                        <path d="M8.0344 18.6084c1.5557.3507 1.5496-5.8917 1.5496-5.8917L9.713 0l-.0046.002A3.4575 3.4575 0 0 1 9.36.1196C7.0268.9563 4.8807 2.1953 3.0002 3.7544c.1806 3.4888-.2616 10.5404-.2616 10.5404s-.0343 1.0521 1.1457 2.6653c1.1798 1.6132 2.5944 1.2976 4.15 1.6483Z" fill="#FFE9CA"></path>
                        <path d="M6.9784 7.1558c-1.3197.1777-2.637.36-3.9573.5235-.0706 3.237-.2825 6.6155-.2825 6.6155s-.0343 1.0521 1.1457 2.6653c1.1799 1.6133 2.5944 1.2976 4.1501 1.6483 1.5557.3507 1.5497-5.8917 1.5497-5.8917l.0449-5.85c-.7628.102-1.8888.1865-2.6506.2891Z" fill="#FDFBFD"></path>
                        <path d="m1.6404 20.3269-.1715 2.034 1.4068.5612.4118-1.5081-1.647-1.0871ZM4.2482 22.0103l-.3641 1.9638 1.7366.6313.2402-1.6833-1.6127-.9118ZM10.4933 25.8328l-.549 1.7885 1.3039.5962.6519-1.5431-1.4068-.8416ZM12.3806 26.8848l-.4805 1.7885 1.6128.6313.4117-1.6834-1.544-.7364Z" fill="#1D8DD7"></path>
                        <path d="M9.6569 12.1726s1.5774 1.3414 1.2686 2.446c0 0 2.45 3.5688 3.7539 4.2352 1.3039.6663 5.147 2.7003 6.5538 7.049 1.4068 4.3487-2.3333 4.3136-4.4607 3.7525-2.1274-.5612-6.6567-3.7175-6.6567-3.7175s-4.0489-2.3146-5.1469-3.2614c0 0-3.7401-1.2976-4.7352-3.9279-.995-2.6302 1.4755-4.8228 2.0245-5.3222l.549-.4994s.8235 3.7174 2.7793 3.8928c1.9559.1753 4.0017-.7967 3.9674-3.1814l.0301-.9218.0729-.5439Z" fill="#243F85"></path>
                        <path d="M7.5124 17.3181s-.828-1.5154.4073-2.0765c1.2353-.5611 1.8144.5541 1.8144.5541l-2.2217 1.5224Z" fill="#D7D7FF"></path>
                        <path d="M4.3855 18.4331s2.745.7365 3.1567.5261c0 0 4.2205 6.6282 4.8382 7.3295 0 0-5.5587-3.8576-6.6224-4.6993-1.0637-.8417-2.7107-1.999-1.3725-3.1563Z" fill="#FDFBFD"></path>
                        <path d="M14.3706 24.395c-.0974-.0341-5.8907-6.2173-6.3822-6.5931-1.0023-.7667-.2059-1.0052.3775-1.5021.5833-.497.7205-1.339 1.5784-.2869.8578 1.0521 5.3184 7.2949 5.3184 7.2949s.4118 1.5431-.8921 1.0872Z" fill="#D7D7FF"></path>
                        <path d="M16.2921 23.3077c-.1029-.1052-3.7744 0-3.7744 0M11.2137 21.6243c.103 0 3.8774.1753 3.8774.1753M14.199 19.906l-1.8186 3.2264M10.9222 21.519l1.2181-3.3667M8.9834 19.3098l4.3062.9363M10.1843 16.0127l-1.2009 3.0164M7.7825 17.5562l3.7487.2455" stroke="#D7D7FF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"></path>
                        <path d="M14.199 25.0961c.103-.1403 1.4412-3.2965 1.4412-3.2965" stroke="#D7D7FF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"></path>
                        <title>Assists</title>
                     </svg>
                  </th>
                 
                  
               </tr>
               {history &&
				history.map((data, index) => (

               <tr className="line">
                  <td className="date">{(new Date(data.gameDate)).toLocaleDateString()}</td>
                  <td className="date_short">22/12</td>
                  <td className="compet">{data.competitionName}</td>
                  <td className="tour">{"Round " + data.matchDay}</td>
                  <td className="game1 own">{data.homeTeamName}</td>
                  {data.result == "win" ? (<td className="victory"><a>{data.score}</a></td>) : (data.result == "lost" ? (<td className="loss"><a>{data.score}</a></td>) : (<td className="draw"><a>{data.score}</a></td>))}
                  <td className="game2 own">{data.awayTeamName}</td>
                  {data.played ? (<td className="minutes">{ data.minsPlayed} °</td>): (<td className="minutes"></td>)}
                  {data.result == "win" ? (<td className="goals firstteam">{data.result}</td>): (data.result == "lost" ? (<td className="goals playeroff">{data.result}</td>) : <td className="goals">{data.result}</td>)}
                  <td className="owngoals">{data.absence_reason}</td>
                  <td className="assists">{data.position}</td>
               </tr>
            ))}
            </tbody>
         </table>
      </div>
   </div>
</div>
       
    </>
  )
  }
}



export default withRouter(Player);