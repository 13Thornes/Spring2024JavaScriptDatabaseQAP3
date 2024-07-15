const dal = require("../Services/SQL/auth_db");

// GET all games
var getGames= function() {
    if(DEBUG) console.log("games.pg.dal.getGames()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_id, game_name, developer FROM games;"
      dal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
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
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

//   var addGame = function(gid, gname, developer) {
//     if(DEBUG) console.log("games.pg.dal.addGame()");
//     return new Promise(function(resolve, reject) {
//       const sql = "INSERT INTO public.games(game_id, game_name, developer) \
//           VALUES ($1, $2, $3);";
//       dal.query(sql, [gid, gname, developer], (err, result) => {
//         if (err) {
//             if(DEBUG) console.log(err);
//             reject(err);
//           } else {
//             resolve(result.rows);
//           }
//       }); 
//     });
//   };


var putGame = function(id, gname, developer) {
    if(DEBUG) console.log("games.pg.dal.putGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.game SET game_name=$2, developer=$3 WHERE actor_id=$1;";
      dal.query(sql, [id, gname, developer], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };


  var patchGame = function(id, gname, developer) {
    if(DEBUG) console.log("games.pg.dal.patchGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.game SET game_name=$2, developer=$3 WHERE game_id=$1;";
      dal.query(sql, [id, gname, developer], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };


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
  


  module.exports = {
    getGames,
    getGameByGameId,
    // addGame,
    putGame,
    deleteGame,
    patchGame
  }