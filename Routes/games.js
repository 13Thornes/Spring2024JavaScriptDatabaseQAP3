
// set constants
const express = require('express');
const router = express.Router();
const gamesDal = require('../Services/pg.games.dal')

// router call to render the games page
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

// router call to render the single game page
router.get('/:id', async (req, res) => {
    try {
        const aGame = await gamesDal.getGameByGameId(req.params.id);
        if(DEBUG) console.log(`games.router.get/:id ${aGame}`);
        if (aGame)
            res.render('game', {aGame});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// router call to render the replace page
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('game.Replace : ' + req.params.id);
    res.render('gamePut.ejs', {gameName: req.query.game_name, developer: req.query.developer, theId: req.params.id});
});

// router call to render the edit page
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('game.Edit : ' + req.params.id);
    res.render('gamePatch.ejs', {gameName: req.query.game_name, developer: req.query.developer, theId: req.params.id});
});

// router call to render the delete page
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('game.Delete : ' + req.params.id);
    res.render('gameDelete.ejs', {gameName: req.query.gameName, developer: req.query.developer, theId: req.params.id});
});

// router call to render the post page
router.post('/', async (req, res) => {
    if(DEBUG) console.log("games.POST");
    try {
        await gamesDal.addGame(req.body.game_id, req.body.game_name, req.body.developer, req.body.release_date, req.body.genre);
        res.redirect('/games/');
    } catch {
        res.render('503');
    } 
});

// router call to render the put page
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PUT: ' + req.params.game_id);
    try {
        await gamesDal.putGame(req.params.id, req.body.gameName, req.body.developer);
        res.redirect('/games/');
    } catch {
        res.render('503');
    }
});

// router call to render the patch page
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PATCH: ' + req.params.id);
    try {
        await gamesDal.patchGame(req.params.id, req.body.gameName, req.body.developer);
        res.redirect('/games/');
    } catch {
        res.render('503');
    }
});


// router call to render the games delete page
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('games.DELETE: ' + req.params.id);
    try {
        await gamesDal.deleteGame(req.params.id);
        res.redirect('/games/');
    } catch (err) {
        if(DEBUG) console.error(err);
        res.render('503');
    }
});




module.exports = router