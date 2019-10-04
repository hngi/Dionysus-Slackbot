const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.get('/sign-up', (req, res) => {
  // req.session.error;
  res.render('signup');
})

router.post('/sign-up', [
  check('name').isLength({min: 3}).withMessage("name is too short or empty"),
  check('email').isEmail().withMessage('invalid email format'),
  check('password').isLength({min: 6}).withMessage('password is too short')
], (req, res) => {
  const errors = validationResult(req);
  let err = errors.array();

  if(!errors.isEmpty()){
    res.render('signup', {error: err[0].msg});
  }else{
    res.redirect('dashboard');
  }
});

module.exports = router;