const express = require('express')

const TeamController = require('../controllers/team-controller')

const router = express.Router()

router.get('/teams/:id', TeamController.getTeamById)
router.get('/teams', TeamController.getTeams)

module.exports = router