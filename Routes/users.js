const express = require('express');
const router = express.Router();
//const loginsDal = require('../services/pg.logins.dal')

// this is the /users route
router.get('/', async (req, res) => {
    const theUsers = [
        {user_id: 1, first_name: 'Ruby', last_name: 'Smith'},
        {user_id: 2, first_name: 'Amber', last_name: 'Hills'},
        {user_id: 3, first_name: 'Opal', last_name: 'Johnson'},
        {user_id: 4, first_name: 'Pearl', last_name: 'Williams'},
        {user_id: 5, first_name: 'Jade', last_name: 'Jones'}
    ];
    try {
//        let theLogins = await loginsDal.getUsers(); 
        if(DEBUG) console.table(theUsers);
        res.render('users', {theUsers});
    } catch {
        res.render('503');
    }
});

router.get('/:id/edit', async (req, res) => {
  if(DEBUG) console.log('user.Edit : ' + req.params.id);
  res.render('userPatch.ejs', {first_name: req.query.first_name, last_name: req.query.last_name, theId: req.params.id});
});

router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('users.PATCH: ' + req.body.first_name);
  try {
      // await loginsDal.patchLogin(req.params.id, req.body.first_name, req.body.last_name);
      res.redirect('/users/');
  } catch {
      // log this error to an error log file.
      res.render('503');
  }
});

module.exports = router