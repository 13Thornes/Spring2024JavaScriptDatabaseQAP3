const dal = require("../Services/SQL/auth_db");

// get all games
var getGames= function() {
    if(DEBUG) console.log("games.pg.dal.getGames()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_id, game_name, developer FROM games;"
    //   SELECT "game_ID", game_name, developer, release_date, genre, platform
	// FROM public."Games";
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


  module.exports = {
    getGames
  }