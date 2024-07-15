const express = require('express');
const router = express.Router();
const gamesDal = require('../Services/pg.games.dal')

router.get('/', async (req, res) => {
    try {
        console.log("Try let await")
        let theGames = await gamesDal.getGames();
        console.log("try console.table")
        if(DEBUG) console.table(theGames);
        console.log("Try render game")
        res.render('games', {theGames});
    } catch {
        res.render('503')
    }
});

module.exports = router