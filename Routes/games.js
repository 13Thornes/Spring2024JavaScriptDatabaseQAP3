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

router.get('/:id', async (req, res) => {
    try {
        const aGame = await gamesDal.getGameByGameId(req.params.id); // from postgresql
        if(DEBUG) console.log(`games.router.get/:id ${aGame}`);
        if (aGame)
            res.render('game', {aGame});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// router.post('/', async (req, res) => {
//     if(DEBUG) console.log("games.POST");
//     try {
//         await gamesDal.addGame(req.body.game_id, req.body.game_name, req.body.developer );
//         res.redirect('/games/');
//     } catch {
//         // log this error to an error log file.
//         res.render('503');
//     } 
// });

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PUT: ' + req.params.id);
    try {
        await gamesDal.putGame(req.params.id, req.body.gameName, req.body.developer);
        res.redirect('/games/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});




module.exports = router