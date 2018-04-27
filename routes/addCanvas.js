var express = require('express');
var router = express.Router();
var colorsDb = require('../db/colors');

router.post('/canvas', function (req, res, next) {
  colorsDb.addReview(req.body, function (err) {
    if (!err) {
      res.send('Success!');
    } else {
      next(err);
    }
  });
});

module.exports = router;
