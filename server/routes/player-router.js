const express = require('express')

const PlayerController = require('../controllers/player-controller')

const router = express.Router()

router.get('/players/:id', PlayerController.getPlayerById)
router.get('/players', PlayerController.getPlayers)

module.exports = router