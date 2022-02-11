const Player = require('../models/players')
const PlayerHistory = require('../models/player-history')



getPlayerById = async (req, res) =>  {
    player_history = []

    player_data = {}
   
    await Player.findOne({ playerId: parseInt(req.params.id) }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res
                .status(404)
                .json({ success: false, error: 'Player not found' })
        }

        PlayerHistory.find({ playerId:  parseInt(req.params.id) }).then(data => {
            player_data = {
                        player: player,
                        history: data
                    }
            return res
                .status(200)
                .json(player_data)
        })
    }).clone()
}

    

getPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Players not found' })
        }
        return res.status(200).json(players)
    }).clone()
}

module.exports = {
    getPlayerById,
    getPlayers,
}

