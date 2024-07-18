
// set constants
const dal = require("./videogames_db");

// GET all games
var getGames= function() {
    if(DEBUG) console.log("games.pg.dal.getGames()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_id, game_name, developer FROM games ORDER BY game_id;"
      dal.query(sql, [], (err, result) => {
        if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  // GET a single game by its game_id
  var getGameByGameId = function(id) {
    if(DEBUG) console.log("games.pg.dal.getGameByGameId()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_name, developer FROM games WHERE game_id = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  // Add a game to the database
  var addGame = function(game_id, game_name, developer, release_date, genre) {
    if(DEBUG) console.log("games.pg.dal.addGame()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.games(game_id, game_name, developer, release_date, genre) VALUES ($1, $2, $3, $4, $5);"
      dal.query(sql, [game_id, game_name, developer, release_date, genre], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };


// replace a game in the database
var putGame = function(game_id, game_name, developer) {
    if(DEBUG) console.log("games.pg.dal.putGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.games SET game_name=$2, developer=$3 WHERE game_id=$1;";
      dal.query(sql, [game_id, game_name, developer], (err, result) => {
        if (err) {
            reject(err);
            console.log("Rejected")
          } else {
            console.log("Accepted")
            resolve(result.rows);
          }
      }); 
    });
  };

// update a game in the database
  var patchGame = function(game_id, game_name, developer) {
    if(DEBUG) console.log("games.pg.dal.patchGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.games SET game_name=$2, developer=$3 WHERE game_id=$1;"
      dal.query(sql, [game_id, game_name, developer], (err, result) => {
        if (err) {
            console.log("Rejected")
            reject(err);
          } else {
            resolve(result.rows);
            console.table(result);
            console.log("results have been resolved")
          }
      }); 
    });
  };

// delete a game from the database
  var deleteGame = function(id) {
    if(DEBUG) console.log("gamess.pg.dal.deleteGame()");
    return new Promise(function(resolve, reject) {
      const sql = "DELETE FROM public.games WHERE game_id = $1;";
      dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  

// export modules
  module.exports = {
    getGames,
    getGameByGameId,
    addGame,
    putGame,
    deleteGame,
    patchGame
  }