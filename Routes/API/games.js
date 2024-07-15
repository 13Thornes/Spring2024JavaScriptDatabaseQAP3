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

module.exports = router;