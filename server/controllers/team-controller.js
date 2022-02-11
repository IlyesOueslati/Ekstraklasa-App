const Team = require('../models/teams')
const Player = require('../models/players')


getTeamById = async (req, res) => {

    team_info = {}
    await Team.findOne({ teamId: parseInt(req.params.id) },{"formation_squad":0}, (err, team) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!team) {
            return res
                .status(404)
                .json({ success: false, error: 'Team not found' })
        }
        Player.find({ teamId:  parseInt(req.params.id) }, {"player":1, "Overall":1,"playerId":1,
            "playerName":1 ,"country":1,"positions":1, 
            "playerAge":1, "teamName": 1,
            "height_cm": 1, "weight_kg": 1, "Preferred_Foot": 1,
            "market_value_k_euro": 1,"height": 1,"contract":1, "_id": 0})
            .sort({"Overall": -1})
            .then(data => {
                team_info = {
                        team: team,
                        players: data
                    }
            return res
                .status(200)
                .json(team_info)
        })
    }).clone()
}

getTeams = async (req, res) => {
    await Team.find({}, {"reputation":1, "teamName": 1,"finances":1, "teamId": 1, "_id": 0}, (err, teams) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!teams.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Teams not found' })
        }
        return res.status(200).json(teams)
    }).sort({"teamName": 1}).clone()
}

module.exports = {
    getTeams,
    getTeamById,
}

