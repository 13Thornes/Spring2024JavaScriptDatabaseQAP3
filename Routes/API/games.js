var router = require('express').Router();
const gamesDal = require('../../Services/pg.games.dal')

// api/games
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/games/ GET ' + req.url);
    try {
        let theGames = await gamesDal.getGames(); 
        res.json(theGames);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});


// api/actors/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/games/:id GET ' + req.url);
    try {
        let aGame = await gamesDal.getGameByGameId(req.params.id); 
        if (aGame.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(aGame);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;